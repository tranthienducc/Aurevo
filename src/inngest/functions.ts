import { inngest } from "@/inngest/client";

export const testFunction = inngest.createFunction(
  {
    id: "autosave-project-workflow",
  },
  { event: "project/autosave.requested" },
  async ({ event }) => {
    console.log("🚀 [Inngest] Project autosave requested:", event);
  }
);
