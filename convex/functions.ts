import { internalMutation, mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const getMessages = query({
  handler: async (ctx) => {
    return await ctx.db.query("messages").collect();
  },
});

/* when we call our API, this will validate that the inputs are all there, and that they're the correct type */
export const createMessage = mutation({
  args: {
    sender: v.string(),
    content: v.string(),
  },
  /*handler: async (ctx, { sender, content }) => {
    await ctx.db.insert("messages", { sender, content });
  },*/
  // Function implementation.
  handler: async (ctx, { sender, content }) => {
    // Insert or modify documents in the database here.
    // Mutations can also read from the database like queries.
    // See https://docs.convex.dev/database/writing-data.
    //const message = ;
    await ctx.db.insert("messages", { sender, content });

    // Optionally, return a value from your mutation.
    //return await ctx.db.get(id);
  },
});

export const upsertUser = internalMutation({
  args: {
    username: v.string(),
    image: v.string(),
    clerkId: v.string(),
  },
  handler: async (ctx, { username, image, clerkId }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkId))
      .unique();

    if (user) {
      await ctx.db.patch(user._id, {
        username: username,
        image: image,
      });
    } else {
      await ctx.db.insert("users", { username, image, clerkId });
    }
  },
});

export const deleteUser = internalMutation({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, { clerkId }) => {
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq("clerkId", clerkId))
      .first();
    if (user) {
      await ctx.db.delete(user._id);
    }
  },
});
