import { Formik, Form, Field } from 'formik';


export default function SearchBar({ onSearch }) {
  return (
    <Formik
      initialValues={{ searchReq: '' }}
      onSubmit={(values, actions) => {
        console.log(values);
        onSearch(values.searchReq.trim());
        actions.resetForm();
      }}
    >
      <Form>
        <Field
          type="text"
          name="searchReq"
          autocomplete="off"
          autofocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </Form>
    </Formik>
  );
}
