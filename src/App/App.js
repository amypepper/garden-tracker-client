import React from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";
import Landing from "../Landing/Landing";
import Navbar from "../Navbar/Navbar";
import Signup from "../Signup/Signup";

const { API_TOKEN, API_BASE_URL } = require("../config");

export default class App extends React.Component {
  state = {
    activities: [],
    categories: [],
  };

  componentDidMount() {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
        Accept: "application/json",
      },
    };
    fetch(`${API_BASE_URL}/api/activities`, options)
      .then((res) => res.json())
      .then((activities) => this.setState({ activities }));

    fetch(`${API_BASE_URL}/api/categories`, options)
      .then((res) => res.json())
      .then((categories) => this.setState({ categories }));
  }

  render() {
    console.log(this.state.activities, this.state.categories);
    return (
      <div className="App">
        <header className="App-header">
          {[
            "/",
            "/dashboard",
            "/categories/:categoryid",
            "/add/categories",

            "/activities/:activityid",
            "/add/activities",
          ].map((path, i) => (
            <Route exact key={i} path={path} component={Navbar} />
          ))}
          <h1>Garden Tracker</h1>
          <h2>Help your plants thrive.</h2>
        </header>

        <main className="App-main">
          <Route exact path="/" component={Landing} />
          <Route exact path="/" component={Signup} />

          {/************************* DASHBOARD ********************************/}
          <Route path="/dashboard">
            <div className="flex-wrapper-column sidebar-wrapper dashboard">
              <section className="flex-wrapper-column sidebar links">
                <Link to="/add/categories">Add Category</Link>
                <Link to="/add/activities">Add Activity</Link>
              </section>
              <section className="flex-wrapper-column folder-nav accordion">
                <h3 className="folder-nav">Categories</h3>
                <ul className="flex-wrapper-column sidebar">
                  {}
                  <li className="accordion">
                    <Link to="/categories/c1">
                      <h4>Weeding</h4>
                    </Link>

                    <button>Delete</button>
                  </li>
                  <li className="accordion">
                    <Link to="/categories/c2">
                      <h4>Feeding</h4>
                    </Link>

                    <button>Delete</button>
                  </li>

                  <li className="accordion">
                    <Link to="/categories/c3">
                      <h4>Watering</h4>
                    </Link>

                    <button>Delete</button>
                  </li>
                </ul>
              </section>
            </div>
            {/* <div className="main-wrapper">
                <h3>All Activities</h3>
                <section>
                  <Link to={`/activities/${activities[0].id}`}>
                    <h4>{activities[0].title}</h4>
                  </Link>
                  <p>{new Date(activities[0].date).toDateString()}</p>

                  <button className="activity-button">Delete</button>
                </section>
                <section>
                  <Link to={`/activities/${activities[1].id}`}>
                    <h4>{activities[1].title}</h4>
                  </Link>
                  <p>{new Date(activities[1].date).toDateString()}</p>

                  <button className="activity-button">Delete</button>
                </section>

                <section>
                  <Link to={`/activities/${activities[2].id}`}>
                    <h4>{activities[2].title}</h4>
                  </Link>
                  <p>{new Date(activities[2].date).toDateString()}</p>

                  <button className="activity-button">Delete</button>
                </section>
                <section>
                  <Link to={`/activities/${activities[3].id}`}>
                    <h4>{activities[3].title}</h4>
                  </Link>
                  <p>{new Date(activities[3].date).toDateString()}</p>

                  <button className="activity-button">Delete</button>
                </section>
              </div>
            */}
          </Route>

          {/********************* CATEGORY PAGES **************************/}
          {/* <Route path="/categories/c1">
            <h3 className="category-header">Weeding</h3>
            <section>
              <Link to={`/activities/${activities[1].id}`}>
                <h4>{activities[1].title}</h4>
              </Link>
              <p>{new Date(activities[1].date).toDateString()}</p>
            </section>
          </Route>
          <Route path="/categories/c2">
            <h3 className="category-header">Feeding</h3>
            <section>
              <Link to={`/activities/${activities[2].id}`}>
                <h4>{activities[2].title}</h4>
              </Link>
              <p>{new Date(activities[2].date).toDateString()}</p>
            </section>
          </Route>
          <Route path="/categories/c3">
            <h3 className="category-header">Watering</h3>
            <section>
              <Link to={`/activities/${activities[0].id}`}>
                <h4>{activities[0].title}</h4>
              </Link>
              <p>{new Date(activities[0].date).toDateString()}</p>
            </section>
            <section>
              <Link to={`/activities/${activities[3].id}`}>
                <h4>{activities[3].title}</h4>
              </Link>
              <p>{new Date(activities[3].date).toDateString()}</p>
            </section>
          </Route> */}

          <Route path="/add/categories">
            <section>
              <h3>Add Category</h3>
              <form className="add-category" aria-label="add-category">
                <fieldset className="category-form">
                  <div className="flex-wrapper-column">
                    <label htmlFor="add-category" className="add-category">
                      Category Name
                    </label>
                    <input
                      type="text"
                      placeholder="category name"
                      id="add-category"
                    />
                  </div>
                </fieldset>

                <fieldset>
                  <button type="submit" aria-label="save">
                    Save
                  </button>
                  <button type="reset" aria-label="cancel">
                    Cancel
                  </button>
                </fieldset>
              </form>
            </section>
          </Route>

          {/* <Route path="/edit/categories/c2">
            <h3>Edit Category</h3>
            <form className="edit-category" aria-label="edit-category">
              <fieldset className="category-form">
                <div className="flex-wrapper-column">
                  <label htmlFor="edit-category" className="edit-category">
                    Category Name
                  </label>
                  <input type="text" value="Feeding" id="edit-category" />
                </div>
              </fieldset>

              <fieldset>
                <button type="submit" aria-label="save">
                  Save
                </button>
                <button type="reset" aria-label="cancel">
                  Cancel
                </button>
              </fieldset>
            </form>
          </Route> */}

          {/********************* ACTIVITY PAGES **************************/}
          {/* {activities.map((activity) => {
            return (
              <Route path={`/activities/${activity.id}`}>
                <section>
                  <h3>{activity.title}</h3>
                  <p>Date: {activity.date}</p>
                  <p>Notes: {activity.description}</p>
                  <p>
                    Category:{" "}
                    {() => {
                      const targetCategory = categories.find(
                        (category) => category.id === activity.categoryId
                      );
                      return targetCategory.title;
                    }}
                  </p>

                  <button>Delete</button>
                </section>
              </Route>
            );
          })} */}

          <Route exact path="/add/activities">
            <section>
              <h3>Add an Activity</h3>
              <form className="activity-form" aria-label="add-activity">
                <fieldset className="new-activity">
                  <div className="flex-wrapper-column">
                    <label htmlFor="new-activity">Activity Name</label>
                    <input
                      type="text"
                      placeholder="activity name"
                      id="new-activity"
                    />
                    <label htmlFor="new-date">Date</label>
                    <input type="date" id="new-date" />
                    <label htmlFor="new-note">Notes (optional)</label>
                    <textarea id="new-note" cols="30" rows="10"></textarea>

                    <label htmlFor="category">Category</label>
                    <select className="category-options">
                      <option value="">Choose a category</option>
                      <option value="Watering">Watering</option>
                      <option value="Feeding">Feeding</option>
                      <option value="Pruning">Weeding</option>
                    </select>
                  </div>
                </fieldset>

                <fieldset aria-label="sign-up">
                  <button type="submit" aria-label="save">
                    Save
                  </button>
                  <button type="reset" aria-label="cancel">
                    Cancel
                  </button>
                </fieldset>
              </form>
            </section>
          </Route>

          {/* <Route path="/edit/activities/4">
            <section>
              <h3>Edit Activity</h3>
              <form className="edit-activity" aria-label="edit-activity">
                <fieldset className="activity-form">
                  <div className="flex-wrapper-column">
                    <label htmlFor="edit-activity">Activity Name</label>
                    <input
                      type="text"
                      id="edit-activity"
                      value="watered lavender"
                    />
                    <label htmlFor="edit-date">Date</label>
                    <input type="date" id="edit-date" value="2020-09-30" />
                    <label htmlFor="edit-note">Notes (optional)</label>
                    <textarea id="edit-note" cols="30" rows="10"></textarea>

                    <label htmlFor="category">Category</label>
                    <select
                      id="category"
                      className="category-options"
                      value="Watering"
                    >
                      <option value="Watering">Watering</option>
                      <option value="Feeding">Feeding</option>
                      <option value="Pruning">Weeding</option>
                    </select>
                  </div>
                </fieldset>

                <fieldset>
                  <button type="submit" aria-label="save">
                    Save
                  </button>
                  <button type="reset" aria-label="cancel">
                    Cancel
                  </button>
                </fieldset>
              </form>
            </section>
          </Route> */}
        </main>

        {/********************* FOOTER **************************/}
        <footer role="contentinfo" className="footer">
          <a className="footer-link" href="mailto:amycarlsonpepper@gmail.com">
            Email
          </a>{" "}
          |{" "}
          <a
            className="footer-link"
            href="https://github.com/amypepper"
            target="blank"
          >
            GitHub
          </a>{" "}
          |{" "}
          <a
            className="footer-link"
            href="https://www.linkedin.com/in/amylynnpepper/"
            target="blank"
          >
            LinkedIn
          </a>
        </footer>
      </div>
    );
  }
}
