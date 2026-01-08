import { useState } from "react";
import './NewCardForm.css';

const NewCardForm = ({ onHandleSubmit }) => {
    const [formFields, setFormFields] = useState({
        message: ""
    });
    const [error, setError] = useState("");


    const handleMessageChange = (event) => {
        setFormFields({
            ...formFields,
            message: event.target.value,
        });
        setError("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const payload = { message: formFields.message.trim() };

        if (!payload.message) {
            setError("Message is required.");
                return;
        }
        
        return onHandleSubmit(formFields).then(() => {
            setFormFields({
                message: "",
            });
            setError("");
        })
        .catch((err) => {
        const details = err?.response?.data?.details;
        setError(details || "Could not create card.");
        });
    };


    return (
        <form className="newCardForm" onSubmit={handleSubmit}>
            <h2>Create New Card</h2>

            <section>
                <label htmlFor="cardMessage">Card Message:</label>
                <input
                    type="text"
                    id="cardMessage"
                    name="message"
                    value={formFields.message}
                    onChange={handleMessageChange}
                    className={error ? "input-error" : ""}
                />
            </section>

            {error && <p className="error-text">{error}</p>}

            <button type="submit">Create Card</button>
        </form>
    );
};

export default NewCardForm;