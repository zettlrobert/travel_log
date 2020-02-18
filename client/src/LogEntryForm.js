import React from 'react';
import { useForm } from 'react-hook-form'

import { createLogEntry } from './API';

const LogEntryForm = ({ location }) => {
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    try {
      data.latitude = location.latitude;
      data.longitude = location.longitude;
      const created = await createLogEntry(data);
      console.log(created);
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
      <label htmlFor="title">Title</label>
      <input name="title" required ref={register} />

      <label htmlFor="description">Description</label>
      <textarea name="description" rows={2} ref={register}></textarea>

      <label htmlFor="personalComment">Personal Comment</label>
      <textarea name="personalComment" rows={2} ref={register}></textarea>

      <label htmlFor="image">Image</label>
      <input name="image" ref={register} />

      <label htmlFor="visitDate">Visit Date</label>
      <input name="visitDate" type="date" required ref={register} />

      <button className="formButton">Create Log Entry</button>
    </form>

  )
}

export default LogEntryForm;