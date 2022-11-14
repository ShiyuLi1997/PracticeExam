require("dotenv").config();
import express, { Request, Response } from "express";
import { customerModel } from "../model/Customers";
import jwtMiddleware from "../middleware/jwtMiddleware";
import {
	HOME_GET,
	HOME_ADD,
	HOME_UPDATE,
	HOME_DELETE,
} from "../utils/constant";
import {
	getAllCustomers,
	saveNewCustomer,
	updateOneWithId,
	deleteOneWithId,
} from "../model/Customers";
import { DATA_RETREIVED, DATA_RETREIVED_FAILED } from "../utils/constant";
var router = express.Router();

// return customer
router.get(
	HOME_GET,
	jwtMiddleware,
	async function (req: Request, res: Response) {
		const allCustomers = await getAllCustomers();
		res.status(200).json({ message: DATA_RETREIVED, data: allCustomers });
		return;
	}
);

// add one customer
router.post(
	HOME_ADD,
	jwtMiddleware,
	async function (req: Request, res: Response) {
		await saveNewCustomer(
			req.body.customerName,
			req.body.customerAddress,
			req.body.customerPhone,
			req.body.customerEmail
		);
		res.status(200).json({ message: "successful" });
	}
);

// update one customer
router.put(
	HOME_UPDATE,
	jwtMiddleware,
	async function (req: Request, res: Response) {
		await updateOneWithId(req.body._id, req.body);
		res.status(200).json({ message: "successful" });
	}
);

// delete one customer
router.delete(
	HOME_DELETE + "/:id",
	jwtMiddleware,
	async function (req: Request, res: Response) {
		await deleteOneWithId(req.params.id);
		res.status(200).json({ message: "successful" });
	}
);

export default router;
