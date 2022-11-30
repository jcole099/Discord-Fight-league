import React from "react";
import players from "../data/players.js";

function Rules() {
  const addPlayer = async (player) => {
    const response = await fetch("/players", {
      method: "POST",
      body: JSON.stringify(player),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 201) {
      console.log("added player");
    } else {
      console.error("failed");
    }
  };

  players.forEach((player) => addPlayer(player));

  return (
    <>
      <article className="appArticle">
        <h2>Populating Database.....</h2>
      </article>
    </>
  );
}

export default Rules;
