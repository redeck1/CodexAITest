import "./App.css";

function App() {
    return (
        <>
            <div className="LLM-UI">
                <div className="Messages">
                    <div class="Block Block--User">
                        <div class="Message Message--User">
                            <span class="Text">
                                Explain me the reason of error caught in my
                                application: FinalizationRegistry is not defined
                                (-1)^7 Explain me the reason of error caught in
                                my application: FinalizationRegistry is not
                                defined (-1)^7
                            </span>
                        </div>
                    </div>

                    <div className="Block Block--LLM">
                        <div className="Message Message--LLM">
                            <span className="Text">
                                Привет! 🌟 Рад тебя видеть! Чем могу помочь
                                сегодня? Если у тебя есть вопросы, идеи или
                                просто хочется поговорить — я здесь, чтобы
                                помочь. Давай начнём! 😊
                            </span>
                        </div>
                    </div>
                </div>

                <div className="Form-Wrapper">
                    <form>
                        <textarea
                            className="Ask-anything"
                            placeholder="Ask anything..."
                        ></textarea>
                        <footer>
                            <button className="button--attach">
                                <span className="Send Send--attach">
                                    Attach
                                </span>
                            </button>
                            <button className="button--send">
                                <span className="Send">Send</span>
                            </button>
                        </footer>
                    </form>
                </div>
            </div>
        </>
    );
}

export default App;
