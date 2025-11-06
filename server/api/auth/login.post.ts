import { authSchema } from "~/utils/validation";
import db from "~/utils/db";

export default defineEventHandler(async (event) => {
  const { email, password } = await readValidatedBody(event, (body) =>
    authSchema.parse(body)
  );

  const existingUser = await db.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser) {
    throw createError({
      statusCode: 400,
      statusMessage: "User Not Found",
    });
  }

  if (!existingUser.hashedPassword) {
    const connectedOAuthAccount = await db.oauthAccount.findFirst({
      where: {
        userId: existingUser.id,
      },
    });

    if (connectedOAuthAccount) {
      const oAuthProvider = connectedOAuthAccount.providerId;

      throw createError({
        statusCode: 400,
        statusMessage: `Account connected with ${oAuthProvider}. please continue with ${oAuthProvider}`,
      });
    }
  }

  if (existingUser.hashedPassword) {
    const isCorrectPassword = await verifyPassword(
      existingUser.hashedPassword,
      password
    );

    if (!isCorrectPassword) {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid Credentials",
      });
    }
  }

  const transformedUser = sanitizeUser(existingUser);

  if (transformedUser) {
    await setUserSession(event, {
      //@ts-ignore
      user: transformedUser,
    });
  }

  await sendRedirect(event, "/");
});
