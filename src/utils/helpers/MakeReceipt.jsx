export const MakeReceipt = ({
    ticketSlip
}) => {
    const rowsStartNumbers = ["20", "23", "25", "30", "40"];
    const rowsTextsStartings = ["AID: ", "TVR: ", "Cless", "EMV I", "Card:", "RRN: ", "Auth ", "Resp ", "Date:"]; 

    const rows = ticketSlip.split('\n');

    return (
        rows.map((row) => {
            const startNumber = row.slice(0, 2);
            const indexChar = row.slice(2, 3);
            const rowText = row.slice(4);

            return (
                <>
                    <div
                        style={{
                            textAlign: indexChar === "C" ? "center" : 
                                       indexChar === "L" ? "start" : 
                                       indexChar === "R" ? "end" : "center",
                            fontSize: startNumber === "20" ? "11px" :
                                      startNumber === "23" ? "12px" :
                                      startNumber === "25" ? "14px" :
                                      startNumber === "30" ? "16px" : 
                                      startNumber === "40" ? "18px" : "18px",
                            fontWeight: (
                                            startNumber === "40" ||
                                            (startNumber === "30" && indexChar === "C") ||
                                            !rowsStartNumbers.includes(startNumber)
                                        ) && "600"
                        }}
                    >
                        {!rowsStartNumbers.includes(startNumber) ? 
                            row :
                            (
                                (startNumber === "25" && indexChar === "L") &&
                                rowsTextsStartings.includes(rowText.slice(0, 5)) ||
                                rowText.startsWith("TID") || 
                                rowText.startsWith("Գումար") ||
                                (
                                    startNumber === "20" &&
                                    !rowText.startsWith("Ստո") &&
                                    !rowText.startsWith("Պահ")
                                )
                            ) ? (
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    {
                                        rowText.startsWith("TID") ?
                                        (
                                            <>
                                                <span>{rowText.slice(0, rowText.indexOf("M"))}</span>
                                                <span>{rowText.slice(rowText.indexOf("M"))}</span>
                                            </>
                                        ) :
                                        rowText.startsWith("Cless") ?
                                        (
                                            <>
                                                <span>{rowText.slice(0, 5)}</span>
                                                <span>{rowText.slice(5)}</span>
                                            </>
                                        ) :
                                        rowText.startsWith("EMV ICC") ?
                                        (
                                            <>
                                                <span>{rowText.slice(0, 7)}</span>
                                                <span>{rowText.slice(7)}</span>
                                            </>
                                        ) :
                                        rowText.startsWith("Magnetic") ?
                                        (
                                            <>
                                                <span>{rowText.slice(0, 8)}</span>
                                                <span>{rowText.slice(8)}</span>
                                            </>
                                        ) :
                                        rowText.startsWith("Card") ?
                                        (
                                            <>
                                                <span>{rowText.slice(0, rowText.indexOf("["))}</span>
                                                <span>{rowText.slice(rowText.indexOf("["))}</span>
                                            </>
                                        ) :
                                        rowText.startsWith("SF") ?
                                        (
                                            <>
                                                <span>{rowText.slice(0, rowText.indexOf(" "))}</span>
                                                <span>{rowText.slice(rowText.lastIndexOf(" "))}</span>
                                            </>
                                        ) :
                                        <>
                                            <span>{rowText.split(": ")[0] + ":"}</span>
                                            <span>{rowText.split(": ")[1]}</span>
                                        </>
                                    }
                                </div>
                            ) : rowText
                        }
                    </div> 
                    {
                        (
                            startNumber === "23" || 
                            row === "Approved" || 
                            row.endsWith("AMD")
                        ) && <br />
                    }
                </>
            )
        })
    );
};