import React, { useState } from "react";
import { Form, FormGroup, Slider, FormSelect } from "shards-react";
import { Timepicker } from "react-timepicker";
import "react-timepicker/timepicker.css";

//load values for timezone dropdown
const timeZoneData = require("./timezones.json");

const FormComponent = ({
  onButtonClick,
  loggedUser,
  db,
  currentState,
  stateFn,
  toggle
}) => {
  //split mins and hours from string
  let [timeHours, timeMins] = currentState.timeToSchedule.split(":");

  //form state
  const [formState, setFormState] = useState({
    timeRead: parseInt(currentState.timeDailyRead),
    Hours: parseInt(timeHours),
    Mins: parseInt(timeMins),
    timeZone: currentState.timeZone,
    open: false
  });

  //handle slider value changes
  const handleSlide = (val) => {
    setFormState((prevState) => {
      return {
        ...prevState,
        timeRead: parseInt(val[0])
      };
    });
  };

  //handle dropdown change
  const handleSelectChange = async (event) => {
    //NOTE:
    //Event needs to be persisted since the event value changes when the event bubbles up
    //also, setting the formState is async, so event value gets nullified (so, caching of the event is needed)
    //event.persist() didnt help
    //so stored event (cached it)
    const cachedEventValue = event.target.value;
    //console.log(cachedEventValue);
    //console.log("Before: ", formState);
    await setFormState((prevState) => {
      return {
        ...prevState,
        timeZone: cachedEventValue
      };
    });
    //console.log("After: ", formState);
  };

  //handle change for time picker
  const onChange = (hours, minutes) => {
    setFormState((prevState) => {
      return {
        ...prevState,
        Hours: hours,
        Mins: minutes
      };
    });
  };

  //return JSX for timezone dropdown
  const timeZoneDropDown = () => {
    return timeZoneData.map((item) => (
      <option value={item.value} key={item.value}>
        {item.text}
      </option>
    ));
  };

  return (
    <Form center="true">
      <FormGroup className="col-md-6">
        <label className="col-form-label">
          Amount of time you want to read daily:{" "}
        </label>
        <div>
          <p>Minutes: {formState.timeRead}</p>
          <Slider
            onSlide={handleSlide}
            connect={[true, false]}
            start={[formState.timeRead]}
            range={{ min: 5, max: 60 }}
          />
        </div>
        <label className="col-form-label">
          Time at which you want your pocket bookmarks to be delivered daily:{" "}
        </label>
        <Timepicker
          hours={formState.Hours}
          minutes={formState.Mins}
          onChange={onChange}
        />
        <label className="col-form-label">Select your timezone: </label>
        <br />
        <FormSelect
          id="select-timezone"
          className="col-md-6"
          //onClick={this.handleSelectChange}
          value={formState.timeZone}
          onChange={handleSelectChange}
        >
          {timeZoneDropDown()}
        </FormSelect>
        <br />
        {/* <label className="col-form-label">
          Current saved timezone in the database is: GMT
          {currentState.timeZone}
        </label> */}
        <br />
        <label className="col-form-label">
          For new accounts timezone saved is: +05:30 (Indian Standard Time) by
          default.
        </label>
      </FormGroup>
      <button
        type="button"
        className="btn btn-primary"
        onClick={(e) => {
          toggle(true);
          onButtonClick(e, formState, loggedUser, db, currentState, stateFn);
        }}
      >
        Save Preferences
      </button>
      <br />
    </Form>
  );
};

export default FormComponent;
