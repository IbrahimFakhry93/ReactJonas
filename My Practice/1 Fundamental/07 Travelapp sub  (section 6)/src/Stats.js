export default function Stats({ items }) {
  //* apply early return
  if (!items)
    return (
      <p>
        <em>Add items to travel</em>
      </p>
    );
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  console.log(numPacked);
  const percentagePack = Math.round((numPacked / numItems) * 100);

  return (
    <footer className="stats">
      <em>
        {percentagePack === 100
          ? `Everything is done✈️`
          : `You have ${numItems} items on your list and you have already packed ${numPacked} (${percentagePack}%) 💼`}
      </em>
    </footer>
  );
}
