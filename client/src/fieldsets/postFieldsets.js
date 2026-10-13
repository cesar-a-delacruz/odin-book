const fields = [
  {
    id: "content",
    placeholder: "New Post...",
    type: "textarea",
  },
  {
    id: "image",
    type: "file",
  },
  {
    id: "id",
    type: "hidden",
  },
];

export const create = [{ fields: [fields[0], fields[1]] }];
