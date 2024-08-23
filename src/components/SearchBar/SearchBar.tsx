import { Formik, Form, Field } from 'formik';

type SearchBarProps = {
  onSearch: (searchReq: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <Formik
      initialValues={{ searchReq: '' }}
      onSubmit={(values, actions) => {
        onSearch(values.searchReq.trim());
        actions.resetForm();
      }}
    >
      <Form>
        <Field
          type="text"
          name="searchReq"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
        <button type="submit">Search</button>
      </Form>
    </Formik>
  );
}
