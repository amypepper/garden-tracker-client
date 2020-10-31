import React from "react";
import Context from "../Context";
import ValidationError from "../ValidationError";

export default class AddCategory extends React.Component {
  static contextType = Context;

  state = {
    category: {
      value: "",
      touched: false,
    },
  };

  clearValues = () => {
    this.setState({
      category: { value: "", touched: false },
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { category } = this.state;
    const newCategory = {
      title: category.value,
    };
    this.context.addCategory(newCategory);
    this.props.history.push(`/dashboard`);
  };

  updateCategory = (categoryName) => {
    this.setState({
      category: { value: categoryName, touched: true },
    });
  };

  validateCategoryName() {
    const categoryName = this.state.category.value.trim();
    if (categoryName.length === 0) {
      return "Name is required";
    } else if (categoryName.length < 3) {
      return "Name must be at least 3 characters long";
    }
  }

  render() {
    return (
      <section>
        <h3>Add Category</h3>

        <form
          className="add-category"
          aria-label="add-category"
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <fieldset className="category-form">
            <div className="flex-wrapper-column">
              <label htmlFor="add-category" className="add-category">
                Category Name
              </label>
              <input
                type="text"
                placeholder="category name"
                name="add-category"
                id="add-category"
                value={this.state.category.value}
                onChange={(e) => this.updateCategory(e.target.value)}
              />
            </div>
            {this.state.category.touched && (
              <ValidationError message={this.validateCategoryName()} />
            )}
          </fieldset>

          <fieldset>
            <button
              type="submit"
              aria-label="save-button"
              disabled={!this.state.category.touched}
            >
              Save
            </button>
            <button type="reset" aria-label="cancel-button">
              Cancel
            </button>
          </fieldset>
        </form>
      </section>
    );
  }
}
