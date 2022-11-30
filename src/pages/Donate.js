import React from "react";

function Donate() {
  const submitHandler = function () {
    let form = document.getElementById("donateForm");
    form.submit();
  };
  return (
    <>
      <article className="articlePage">
        <h2>Donate</h2>
        <div className="articleDescription">
          {/* Discord Fight League is a free platform. Discord Fight League will
          never attempt to monetize. We will never include advertisements in any
          of our content. This league exists for the love of the game. Nothing
          more.<br></br> */}
          We have a small amount of monthly web hosting expenses to cover. If
          you enjoy Discord Fight League and would like to help cover some of
          the expenses, please consider donating.
          <form
            action="https://www.paypal.com/donate"
            method="post"
            target="_top"
            id="donateForm"
          >
            <input type="hidden" name="business" value="W946PLCZUYM8Q" />
            <input type="hidden" name="no_recurring" value="0" />
            <input
              type="hidden"
              name="item_name"
              value="To help support server costs related to Discord Fight League."
            />
            <input type="hidden" name="currency_code" value="USD" />
            <div className="donateButtonOutter">
              <div className="donateButton" onClick={submitHandler}>
                Donate
              </div>
            </div>
          </form>
        </div>
      </article>
    </>
  );
}

export default Donate;
