import {
  getGraphData,
  getSalesCount,
  getStockCount,
  getTotalRevenue,
} from "~/server/utils/analytics";

export default defineEventHandler(async (event) => {
  const totalRevenue = await getTotalRevenue();
  const salesCount = await getSalesCount();
  const stockCount = await getStockCount();
  const graphData = await getGraphData();

  return {
    totalRevenue,
    salesCount,
    stockCount,
    graphData,
  };
});
