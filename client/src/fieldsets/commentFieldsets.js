const fields = [
  {
    id: "content",
    placeholder: "New Post...",
    type: "textarea",
  },
  {
    id: "postId",
    type: "hidden",
  },
  {
    id: "id",
    type: "hidden",
  },
];

export const create = [{ fields: [fields[0], fields[1]] }];
