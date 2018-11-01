import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";

class MovieForm extends Form {
  state = {
    data: { title: "", genre: "", stock: "", rate: "" },
    errors: {}
  };
  schema = {
    title: Joi.string()
      .required()
      .label("Title"),
    stock: Joi.number()
      .required()
      .label("Number in stock")
      .min(0)
      .max(100),
    rate: Joi.number()
      .required()
      .label("Daily rental rate")
      .min(0)
      .max(10)
  };
  render() {
    // const { match, history } = this.props;
    return (
      <div className="movie-form-test">
        <h1>Movie Form</h1>
        {this.renderInput("title", "Title")}
        {this.renderDropdown("Genre")}
        {this.renderInput("stock", "Number in stock")}
        {this.renderInput("rate", "Rate")}
        {this.renderButton("Save")}
      </div>
    );
  }
}
export default MovieForm;
