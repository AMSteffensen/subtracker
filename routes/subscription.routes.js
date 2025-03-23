import { Router } from "express";
import authorize from "../middleware/auth.middleware.js";
import {
    createSubscription,
    getSubscription,
    getSubscriptions,
    getUserSubscriptions
} from "../controllers/subscription.controller.js";
import {getUser} from "../controllers/user.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", authorize, getSubscriptions);

subscriptionRouter.get("/:id", authorize, getSubscription);

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", (req, res) =>
  res.send({ title: "Update subscription by id" })
);
subscriptionRouter.delete("/:id", (req, res) =>
  res.send({ title: "Delete subscription" })
);
subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.put("/:id/cancel", (req, res) =>
  res.send({ title: "Cancel subscription" })
);
subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send({ title: "Get upcoming renewals" })
);

export default subscriptionRouter;
