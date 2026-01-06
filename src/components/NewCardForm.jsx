import { useState } from "react";

const NewCardForm = () => {
    const [formFields, setFormFields] = useState({
        message: "",
    });

    const handleMessageChange = (event) => {
        setFormFields({
            ...formFields,
            message: event.target.value,
        });
    };


    return (
        <form className="newCardForm">
            <h2>Create New Card</h2>
            <section>
                <label htmlFor="cardMessage">Card Message:</label>
                <input type="text" id="cardMessage" name="cardMessage" value={formFields.message} onChange={handleMessageChange} required />
            </section>
            <button type="submit" value="Add card">Create Card</button>
        </form>
    );
};

export default NewCardForm;