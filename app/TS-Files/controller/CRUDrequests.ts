const form = <HTMLFormElement>document.getElementById("website-form");

const compileFormData = async (
  form: HTMLFormElement
): Promise<websiteObject> => {
  const extractedData = new FormData(form) as unknown as Iterable<
    [websiteObject, FormDataEntryValue]
  >;
  const dataEntries: websiteObject = Object.fromEntries(extractedData);
  const createId: string = await window.API.backend.generateId();
  const compileNewData: websiteObject = {
    ...dataEntries,
    id: createId,
  };
  return compileNewData;
};

form.addEventListener("submit", async (e: SubmitEvent) => {
  e.preventDefault();
  const targetForm: HTMLFormElement = <HTMLFormElement>e.target;
  const compiledFormData: websiteObject = await compileFormData(targetForm);
  // If ID empty, throw
  console.log("hi", compiledFormData);
  // encryoptData
  //
  // Submit data to json.
});
