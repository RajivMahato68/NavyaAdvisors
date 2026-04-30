import { portfolioDB } from "@/app/mock/portfolioDB";

// GET
export const fetchPortfolio = async () => {
  await new Promise((r) => setTimeout(r, 300));
  return [...portfolioDB]; 
};

// ADD
export const addStock = async (stock: any) => {
  await new Promise((r) => setTimeout(r, 300));

  const newStock = {
    id: Date.now().toString(),
    ...stock,
  };

  portfolioDB.push(newStock);

  return newStock;
};

// UPDATE
export const updateStock = async ({ id, data }: any) => {
  await new Promise((r) => setTimeout(r, 300));

  const index = portfolioDB.findIndex((item) => item.id === id);

  if (index !== -1) {
    portfolioDB[index] = { ...portfolioDB[index], ...data };
  }

  return { id, ...data };
};

// DELETE
export const deleteStock = async (id: string) => {
  await new Promise((r) => setTimeout(r, 300));

  const index = portfolioDB.findIndex((item) => item.id === id);

  if (index !== -1) {
    portfolioDB.splice(index, 1);
  }

  return id;
};