import { Request, Response } from "express";
import { CreateItemService } from "../../services/order/CreateItemService";

class CreateItemController{
    async handle(req:Request, res:Response){
        const { order_id, product_id, amount } = req.body;

        const addItem = new CreateItemService();
        const order = await addItem.execute({
            order_id,
            product_id,
            amount
        })
        return res.json(order)
    }
}

export { CreateItemController };