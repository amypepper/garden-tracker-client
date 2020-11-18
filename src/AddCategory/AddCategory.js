import React from "react";

import { API_BASE_URL } from "../config";
import Context from "../Context";
import TokenService from "../services/token-service";
import ValidationError from "../ValidationError";

export default class AddCategory extends React.Component {
  static contextType = Context;

  state = {
    title: "",
    userid: null,
    touched: false,
  };

  clearValues = () => {
    this.setState({
      title: "",
      userid: null,
      touched: false,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, userid } = this.state;
    const newCategory = {
      title,
      userid,
    };
    const postOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TokenService.hasAuthToken()}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory),
    };

    fetch(`${API_BASE_URL}/api/categories`, postOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later");
        }
        return res.json();
      })
      .then((category) => {
        this.context.addCategory(category);
        this.props.history.push(`/dashboard`);
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
  };

  updateCategory = (categoryName) => {
    this.setState({
      title: categoryName,
      userid: this.context.user.id,
      touched: true,
    });
  };

  validateCategoryName() {
    const categoryName = this.state.title.trim();
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
                value={this.state.title}
                onChange={(e) => this.updateCategory(e.target.value)}
              />
            </div>
            {this.state.touched && (
              <ValidationError message={this.validateCategoryName()} />
            )}
          </fieldset>

          <fieldset>
            <button
              type="submit"
              aria-label="save-button"
              disabled={!this.state.touched}
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
