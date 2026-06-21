export const validateArticle = (form) => {
  const errors = {};

  if (!form.title || form.title.trim().length < 5) {
    errors.title = "Title must be at least 5 characters";
  }

  if (!form.category) {
    errors.category = "Category is required";
  }

  if (!form.short_description || form.short_description.length < 10) {
    errors.short_description =
      "Short description must be at least 10 characters";
  }

  if (!form.content || form.content.length < 20) {
    errors.content = "Content must be at least 20 characters";
  }

  return errors;
};
