export const getManagerProduct = async () => {
  const productModel = await import("./MongoDB/models/Product");
  return productModel;
};

export const getManagerMessage = async () => {
  const messageModel = await import("./MongoDB/models/Message");
  return messageModel;
};

export const getManagerCart = async () => {
    const cartModel = await import("./MongoDB/models/Cart");
    return cartModel;
    }