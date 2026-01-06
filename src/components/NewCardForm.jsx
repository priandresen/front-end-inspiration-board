const NewCardForm = () => {
    return (
        <form className="new-card-form">
            <h2>Create New Card</h2>
            <div className="form-group">
                <label htmlFor="card-title">Card Title:</label>
                <input type="text" id="card-title" name="card-title" required />
            </div>
            <div className="form-group">
                <label htmlFor="card-description">Card Description:</label>
                <textarea id="card-description" name="card-description"></textarea>
            </div>
            <button type="submit">Create Card</button>
        </form>
    );
};

export default NewCardForm;