import React from "react";
import { Route, Link } from "react-router-dom";
import "./App.css";
import Landing from "../Landing/Landing";
import Navbar from "../Navbar/Navbar";
import Signup from "../Signup/Signup";

const activities = [
  {
    id: 1,
    title: "watered brussels sprouts",
    description: "Watered lightly because it's supposed to rain tonight",
    date: "2020-10-05",
    categoryId: "c3",
  },
  {
    id: 2,
    title: "weeded raspberry bushes",
    description: "",
    date: "2020-10-01",
    categoryId: "c1",
  },
  {
    id: 3,
    title: "mulched garden beds",
    description: "",
    date: "2020-09-22",
    categoryId: "c2",
  },
  {
    id: 4,
    title: "watered lavender",
    description: "",
    date: "2020-09-30",
    categoryId: "c3",
  },
];

const categories = [
  {
    id: "c1",
    title: "Weeding",
  },
  {
    id: "c2",
    title: "Feeding",
  },
  {
    id: "c3",
    title: "Watering",
  },
];

export default class App extends React.Component {
  render() {
    const category = categories.find(
      (category) => category.id === activities[1].categoryId
    );

    return (
      <div className="App">
        <header className="App-header">
          {[
            "/",
            "/dashboard",
            "/categories/:categoryid",
            "/add/categories",
            "/edit/categories/:categoryid",
            "/activities/:activityid",
            "/add/activities",
            "/edit/activities/:activityid",
          ].map((path, i) => (
            <Route exact key={i} path={path} component={Navbar} />
          ))}
          <h1>Garden Tracker</h1>
          <h2>Help your plants thrive.</h2>
          <Link to="/dashboard">
            <button>Home</button>
          </Link>
        </header>

        <main className="App-main">
          <Route exact path="/" component={Landing} />
          <Route exact path="/" component={Signup} />

          {/************************* DASHBOARD ********************************/}
          <Route path="/dashboard">
            <>
              <div className="flex-wrapper-column sidebar-wrapper dashboard">
                <section className="flex-wrapper-column sidebar links">
                  <Link to="/add/categories">Add Category</Link>
                  <Link to="/add/activities">Add Activity</Link>
                </section>
                <section className="flex-wrapper-column folder-nav accordion">
                  <h3 className="folder-nav">Activity Categories</h3>
                  <ul className="flex-wrapper-column sidebar">
                    <li className="accordion">
                      <Link to="/categories/c1">
                        <h4>Weeding</h4>
                      </Link>
                      <Link to="/edit/categories/c1">
                        <button>Edit</button>
                      </Link>
                      <button>Delete</button>
                    </li>
                    <li className="accordion">
                      <Link to="/categories/c2">
                        <h4>Feeding</h4>
                      </Link>
                      <Link to="/edit/categories/c2">
                        <button>Edit</button>
                      </Link>
                      <button>Delete</button>
                    </li>

                    <li className="accordion">
                      <Link to="/categories/c3">
                        <h4>Watering</h4>
                      </Link>
                      <Link to="/edit/categories/c3">
                        <button>Edit</button>
                      </Link>
                      <button>Delete</button>
                    </li>
                  </ul>
                </section>
              </div>
              <div className="main-wrapper">
                <h3>All Activities</h3>
                <section>
                  <Link to={`/activities/${activities[0].id}`}>
                    <h4>{activities[0].title}</h4>
                  </Link>
                  <p>{new Date(activities[0].date).toDateString()}</p>
                  <Link to={`edit/activities/${activities[0].id}`}>
                    <button className="activity-button">Edit</button>
                  </Link>
                  <button className="activity-button">Delete</button>
                </section>
                <section>
                  <Link to={`/activities/${activities[1].id}`}>
                    <h4>{activities[1].title}</h4>
                  </Link>
                  <p>{new Date(activities[1].date).toDateString()}</p>
                  <Link to={`edit/activities/${activities[1].id}`}>
                    <button className="activity-button">Edit</button>
                  </Link>
                  <button className="activity-button">Delete</button>
                </section>

                <section>
                  <Link to={`/activities/${activities[2].id}`}>
                    <h4>{activities[2].title}</h4>
                  </Link>
                  <p>{new Date(activities[2].date).toDateString()}</p>
                  <Link to={`edit/activities/${activities[2].id}`}>
                    <button className="activity-button">Edit</button>
                  </Link>
                  <button className="activity-button">Delete</button>
                </section>
                <section>
                  <Link to={`/activities/${activities[3].id}`}>
                    <h4>{activities[3].title}</h4>
                  </Link>
                  <p>{new Date(activities[3].date).toDateString()}</p>
                  <Link to={`edit/activities/${activities[3].id}`}>
                    <button className="activity-button">Edit</button>
                  </Link>
                  <button className="activity-button">Delete</button>
                </section>
              </div>
            </>
          </Route>

          {/********************* CATEGORY PAGES **************************/}
          <Route path="/categories/c1">
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
          </Route>

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

          <Route path="/edit/categories/c3">
            <h3>Edit Category</h3>
            <form className="edit-category" aria-label="edit-category">
              <fieldset className="category-form">
                <div className="flex-wrapper-column">
                  <label htmlFor="edit-category" className="edit-category">
                    Category Name
                  </label>
                  <input type="text" value="Watering" id="edit-category" />
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
          </Route>

          <Route path="/edit/categories/c2">
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
          </Route>

          <Route path="/edit/categories/c1">
            <h3>Edit Category</h3>
            <form className="edit-category" aria-label="edit-category">
              <fieldset className="category-form">
                <div className="flex-wrapper-column">
                  <label htmlFor="edit-category" className="edit-category">
                    Category Name
                  </label>
                  <input type="text" value="Weeding" id="edit-category" />
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
          </Route>

          {/********************* ACTIVITY PAGES **************************/}

          <Route path="/activities/1">
            <section>
              <h3>{activities[0].title}</h3>
              <p>Date: {activities[0].date}</p>
              <p>Notes: {activities[0].description}</p>
              <p>Category: {category.title}</p>
              <Link to="/edit/activities/1">
                <button>Edit</button>
              </Link>
              <button>Delete</button>
            </section>
          </Route>
          <Route path="/activities/2">
            <section>
              <h3>{activities[1].title}</h3>
              <p>Date: {activities[1].date}</p>
              <p>Notes: {activities[1].description}</p>
              <p>Category: {category.title}</p>
              <Link to="/edit/activities/2">
                <button>Edit</button>
              </Link>
              <button>Delete</button>
            </section>
          </Route>
          <Route path="/activities/3">
            <section>
              <h3>{activities[2].title}</h3>
              <p>Date: {activities[2].date}</p>
              <p>Notes: {activities[2].description}</p>
              <p>Category: {category.title}</p>
              <Link to="/edit/activities/3">
                <button>Edit</button>
              </Link>
              <button>Delete</button>
            </section>
          </Route>
          <Route path="/activities/4">
            <section>
              <h3>{activities[3].title}</h3>
              <p>Date: {activities[3].date}</p>
              <p>Notes: {activities[3].description}</p>
              <p>Category: {category.title}</p>
              <Link to="/edit/activities/4">
                <button>Edit</button>
              </Link>
              <button>Delete</button>
            </section>
          </Route>

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

          <Route path="/edit/activities/4">
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
          </Route>

          <Route path="/edit/activities/3">
            <section>
              <h3>Edit Activity</h3>
              <form className="edit-activity" aria-label="edit-activity">
                <fieldset className="activity-form">
                  <div className="flex-wrapper-column">
                    <label htmlFor="edit-activity">Activity Name</label>
                    <input
                      type="text"
                      id="edit-activity"
                      value="mulched garden beds"
                    />
                    <label htmlFor="edit-date">Date</label>
                    <input type="date" id="edit-date" value="2020-09-22" />
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
          </Route>

          <Route path="/edit/activities/2">
            <section>
              <h3>Edit Activity</h3>
              <form className="edit-activity" aria-label="edit-activity">
                <fieldset className="activity-form">
                  <div className="flex-wrapper-column">
                    <label htmlFor="edit-activity">Activity Name</label>
                    <input
                      type="text"
                      id="edit-activity"
                      value="weeded raspberry bushes"
                    />
                    <label htmlFor="edit-date">Date</label>
                    <input type="date" id="edit-date" value="2020-10-01" />
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
          </Route>

          <Route path="/edit/activities/1">
            <section>
              <h3>Edit Activity</h3>
              <form className="edit-activity" aria-label="edit-activity">
                <fieldset className="activity-form">
                  <div className="flex-wrapper-column">
                    <label htmlFor="edit-activity">Activity Name</label>
                    <input
                      type="text"
                      id="edit-activity"
                      value="watered brussels sprouts"
                    />
                    <label htmlFor="edit-date">Date</label>
                    <input type="date" id="edit-date" value="2020-10-05" />
                    <label htmlFor="edit-note">Notes (optional)</label>
                    <textarea
                      id="edit-note"
                      cols="30"
                      rows="10"
                      value="Watered lightly because it's supposed to rain tonight."
                    ></textarea>

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
          </Route>
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
