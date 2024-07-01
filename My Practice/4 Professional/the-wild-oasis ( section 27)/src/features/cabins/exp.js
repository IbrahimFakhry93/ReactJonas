function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);

 return {showForm && (
    <CreateCabinForm
      cabinToEdit={cabin}
    />
}

}


function CreateCabinForm({ cabinToEdit = {} }) {

return (<Button
          
variation="secondary"
type="reset"
>
Cancel
</Button>
)
}
