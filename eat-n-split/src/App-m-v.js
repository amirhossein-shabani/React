import { useState } from "react";

const initialFriends = [
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [friends, setFriend] = useState(initialFriends);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setIsOpen((isOpen) => !isOpen);
    setSelectedFriend(null);
  }

  function handleAddFriend(friend) {
    setFriend((friends) => [...friends, friend]);
  }

  function handleDeleteFriend(friend) {
    setFriend((firends) =>
      firends.filter((f) =>
        f.balance === 0 && friend.balance === 0 ? f.id !== friend.id : f
      )
    );
    setSelectedFriend(null);
    setIsOpen(false);
  }

  function handleSelection(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setIsOpen(false);
  }

  function handleSplitBill(value) {
    console.log(value);
    setFriend((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectedFriend(null);
  }

  return (
    <>
      <h1 style={{ marginBottom: "30px" }}>Eat and Split with your friend's</h1>
      <div className="app">
        <div className="sidebar">
          <FriendsList
            friends={friends}
            onDeleteFriend={handleDeleteFriend}
            onSelected={handleSelection}
            selectedFriend={selectedFriend}
          />

          {isOpen && (
            <FormAddFriend isOpen={isOpen} onAddFriend={handleAddFriend} />
          )}

          <Button onClick={handleShowAddFriend}>
            {isOpen ? "Close" : "Add friend"}
          </Button>
        </div>

        {selectedFriend && (
          <FormSplitBill
            sFriend={selectedFriend}
            onSplitBill={handleSplitBill}
          />
        )}
      </div>
    </>
  );
}

function FriendsList({ friends, onDeleteFriend, onSelected, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onDeleteFriend={onDeleteFriend}
          onSelected={onSelected}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onDeleteFriend, onSelected, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  function handleDelete(e) {
    onDeleteFriend(e);
  }

  return (
    <li className={isSelected ? "selected" : ""}>
      <button className="xmark" onClick={() => handleDelete(friend)}>
        ❌
      </button>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance > 0 && (
        <p className="green">
          {friend.name}'s own you {friend.balance}$
        </p>
      )}
      {friend.balance < 0 && (
        <p className="red">
          You own {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}
      <Button onClick={() => onSelected(friend)}>
        {isSelected ? "Close" : "Selected"}
      </Button>
    </li>
  );
}

function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();

    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🧑‍🤝‍🧑Friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label>📷Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ sFriend, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [userExpense, setUserExpense] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const friendExpense = bill - userExpense;

  function handleSplit(e) {
    e.preventDefault();

    if (!userExpense || !bill) return;
    onSplitBill(whoIsPaying === "user" ? friendExpense : -userExpense);
  }

  return (
    <form className="form-split-bill" onSubmit={handleSplit}>
      <h2>Split a bill with {sFriend.name}</h2>
      <label>💵 Bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => {
          if (isNaN(e.target.value)) return;
          setBill(Number(e.target.value));
        }}
      />
      <label>🧍‍♂️Your expense</label>
      <input
        type="text"
        value={userExpense}
        onChange={(e) => {
          if (isNaN(e.target.value)) return;
          setUserExpense(Number(e.target.value));
        }}
      />
      <label>🧑‍🤝‍🧑{sFriend.name}'s expense</label>
      <input type="text" disabled value={friendExpense} />
      <label>🤑Who is paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{sFriend.name}</option>
      </select>

      <Button>Split bill</Button>
    </form>
  );
}
