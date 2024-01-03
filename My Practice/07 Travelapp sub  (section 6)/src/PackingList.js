import { useState } from "react";
import Item from "./App";

export default function PackingList({
  items,
  onDeleteItems,
  onCheckItems,
  onClearList,
}) {
  const [sortBy, setSortby] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems?.map((item) => (
          <Item
            onClearList={onClearList}
            item={item}
            onDeleteItems={onDeleteItems}
            onCheckItems={onCheckItems}
            key={item.id}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortby(e.target.value)}>
          <option value="input">Sort by input</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed</option>
        </select>
        <button className="button" onClick={onClearList}>
          Clear List
        </button>
      </div>
    </div>
  );
}
