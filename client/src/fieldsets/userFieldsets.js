const fields = [
  {
    id: "username",
    placeholder: "johnsmith",
    label: "Username",
    type: "text",
  },
  {
    id: "name",
    placeholder: "John Smith",
    label: "Name",
    type: "text",
  },
  {
    id: "password",
    label: "Password",
    type: "password",
  },
  {
    id: "bio",
    placeholder: "Hello everyone!",
    label: "Bio",
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
export const login = [{ fields: [fields[0], fields[2]] }];

export const create = [
  { legend: "About you", fields: [fields[4], fields[1], fields[3]] },
  {
    legend: "Credentials",
    fields: [
      fields[0],
      fields[2],
      {
        id: "confirm",
        label: "Confirm password",
        type: "password",
      },
    ],
  },
];
