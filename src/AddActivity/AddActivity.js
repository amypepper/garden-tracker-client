import React from "react";

import Context from "../Context";

export default class AddActivity extends React.Component {
  static contextType = Context;

  state = {
    title: "",
    dateCompleted: "",
    timeCompleted: "",
    notes: "",
    categoryId: "",
    touched: false,
  };

  clearValues = () => {
    this.setState({
      title: "",
      dateCompleted: "",
      timeCompleted: "",
      notes: "",
      categoryId: "",
      touched: false,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      title,
      dateCompleted,
      timeCompleted,
      notes,
      categoryId,
    } = this.state;
    const id = title.concat("-", dateCompleted);
    const newActivity = {
      id: id.replaceAll(" ", "-"),
      title,
      dateCompleted,
      timeCompleted,
      notes,
      categoryId,
    };

    this.context.addActivity(newActivity);
    this.props.history.push(`/activities/${newActivity.id}`);
  };

  updateCategory = (categoryId) => {
    this.setState({
      categoryId,
      touched: true,
    });
  };

  updateDate = (dateCompleted) => {
    this.setState({
      dateCompleted,
      touched: true,
    });
  };

  updateNotes = (notes) => {
    this.setState({
      notes,
      touched: true,
    });
  };

  updateTime = (timeCompleted) => {
    this.setState({
      timeCompleted,
      touched: true,
    });
  };

  updateTitle = (activityName) => {
    this.setState({
      title: activityName,
      touched: true,
    });
  };

  render() {
    const { categories = [] } = this.context || [];
    return (
      <section>
        <h3>Add an Activity</h3>
        <form
          className="activity-form"
          aria-label="add-activity"
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <fieldset className="new-activity">
            <div className="flex-wrapper-column">
              <label htmlFor="new-activity">Activity Name</label>
              <input
                type="text"
                placeholder="Activity name"
                id="new-activity"
                value={this.state.title}
                onChange={(e) => this.updateTitle(e.target.value)}
              />
              <label htmlFor="new-date">Date Completed</label>
              <input
                type="date"
                id="new-date"
                value={this.state.dateCompleted}
                onChange={(e) => this.updateDate(e.target.value)}
              />
              <label htmlFor="time-completed">Time of Day (optional)</label>
              <select
                id="time-completed"
                className="time-options"
                value={this.state.timeCompleted}
                onChange={(e) => this.updateTime(e.target.value)}
              >
                <option value="">Choose a time</option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
              </select>
              <label htmlFor="new-note">Notes (optional)</label>
              <textarea
                id="new-note"
                cols="30"
                rows="10"
                value={this.state.notes}
                onChange={(e) => this.updateNotes(e.target.value)}
              />

              <label htmlFor="category">Category (optional)</label>
              <select
                id="category"
                className="category-options"
                value={this.state.categoryId}
                onChange={(e) => this.updateCategory(e.target.value)}
              >
                <option value="">Choose a category</option>
                {categories.map((category, i) => (
                  <option key={i} value={category.id}>
                    {category.title}
                  </option>
                ))}
              </select>
            </div>
          </fieldset>

          <fieldset aria-label="buttons">
            <button
              type="submit"
              aria-label="save-button"
              disabled={
                (this.state.title.length === 0) |
                (this.state.dateCompleted.length === 0)
              }
            >
              Save
            </button>
            <button
              type="reset"
              aria-label="cancel-button"
              onClick={() => this.props.history.push("/dashboard")}
            >
              Cancel
            </button>
          </fieldset>
        </form>
      </section>
    );
  }
}
