import { authSchema } from "~/utils/validation";
import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  const { name, email, password } = await readValidatedBody(event, (body) =>
    authSchema.parse(body)
  );

  const userExists = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (userExists) {
    throw createError({
      statusCode: 400,
      statusMessage: "User already exists",
    });
  }

  const hashedPassword = await hashPassword(password);
  const user = await db.user.create({
    data: {
      email,
      hashedPassword,
      name,
    },
  });

  const transformedUser = sanitizeUser(user);

  if (transformedUser) {
    await setUserSession(event, {
      user: transformedUser,
    });
  }

  await sendRedirect(event, "/");
});
