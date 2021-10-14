import * as yup from "yup";

export function createYupSchema(schema, config) {
  console.log("schema", schema);
  console.log("config", config);
  const { id, validationType, validations = [] } = config;
  if (!yup[validationType]) {
    return schema;
  }
  let validator = yup[validationType]();
  validations.forEach((validation) => {
    const { params, type } = validation;
    if (!validator[type]) {
      return;
    }
    console.log(type, params);
    validator = validator[type](...params);
  });
  schema[id] = validator;
  console.log("schema", schema);
  return schema;
}
