import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import Button from "../ui/Button";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import CreateCabinForm from "../features/cabins/CreateCabinForm";

function Cabins() {
  //! just for experiment, we will make a side effect in this page
  //  useEffect(function () {
  //   getCabins().then((data) => console.log(data));
  // }, []);
  //* in this section 26, we will fetch the data using react query
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      {/* You will see here CabinTable and CreateCabinForm are vertically aligned 
      because Row is set by default as type = vertical*/}
      <Row>
        <CabinTable />
        <Button onClick={() => setShowForm((show) => !show)}>
          Add new cabin
        </Button>
        {showForm && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;