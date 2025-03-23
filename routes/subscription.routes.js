import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) =>
  res.send({ title: "Get all subscriptions" })
);
subscriptionRouter.get("/:id", (req, res) =>
  res.send({ title: "Get subscription details" })
);
subscriptionRouter.post("/", (req, res) =>
  res.send({ title: "Create new subscription" })
);
subscriptionRouter.put("/:id", (req, res) =>
  res.send({ title: "Update subscription by id" })
);
subscriptionRouter.delete("/:id", (req, res) =>
  res.send({ title: "Delete subscription" })
);
subscriptionRouter.put("/:id/cancel", (req, res) =>
  res.send({ title: "Cancel subscription" })
);
subscriptionRouter.get("/upcoming-renewals", (req, res) =>
  res.send({ title: "Get upcoming renewals" })
);

export default subscriptionRouter;
