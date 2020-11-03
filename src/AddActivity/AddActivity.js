import React from "react";

import { API_TOKEN, API_BASE_URL } from "../config";
import Context from "../Context";

export default class AddActivity extends React.Component {
  // remember to remove userid placeholder!!

  static contextType = Context;

  state = {
    title: "",
    dateCompleted: "",
    timeCompleted: "",
    notes: "",
    categoryId: "",
    userid: null,
    touched: false,
  };

  clearValues = () => {
    this.setState({
      title: "",
      dateCompleted: "",
      timeCompleted: "",
      notes: "",
      categoryId: "",
      userid: null,
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

    const newActivity = {
      title,
      datecompleted: dateCompleted,
      timecompleted: timeCompleted,
      notes,
      categoryid: Number(categoryId),
      userid: 1,
    };
    const postOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newActivity),
    };

    fetch(`${API_BASE_URL}/api/activities`, postOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, please try again later");
        }
        return res.json();
      })
      .then((activity) => {
        this.context.addActivity(activity);
        this.props.history.push(`/activities/${activity.id}`);
      })
      .catch((err) => {
        this.setState({
          error: err.message,
        });
      });
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
    const { categories = [] } = this.context || {};
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
                name="activity-title"
                value={this.state.title}
                onChange={(e) => this.updateTitle(e.target.value)}
              />
              <label htmlFor="new-date">Date Completed</label>
              <input
                type="date"
                id="new-date"
                name="activity-date"
                value={this.state.dateCompleted}
                onChange={(e) => this.updateDate(e.target.value)}
              />
              <label htmlFor="time-completed">Time of Day (optional)</label>
              <select
                id="time-completed"
                className="time-options"
                name="activity-time"
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

              <label htmlFor="category">Category</label>
              <select
                id="activity-category"
                className="category-options"
                name="activity-category"
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
                (this.state.dateCompleted.length === 0) |
                (this.state.categoryId.length === 0)
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
