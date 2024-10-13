import {FaArrowLeft, FaArrowRight} from "react-icons/fa";

const PageNation = ({
                        currentPage,
                        startPage,
                        endPage,
                        totalPages,
                        handlePageChange,
                        pagesPerRange,
                        divMargin
                    }) => {
    const renderPageNumbers = () => {
        const pageNumbers = [];

        if (startPage > 1) {
            pageNumbers.push(
                <button
                    key="prev"
                    onClick={() => handlePageChange(startPage - pagesPerRange)}
                    style={buttonStyle}
                >
                    <FaArrowLeft/>
                </button>
            );
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={currentPage === i ? "active-page" : ""}
                    style={{
                        ...buttonStyle,
                        backgroundColor: currentPage === i ? "#007bff" : "transparent",
                        color: currentPage === i ? "#fff" : "#000",
                    }}
                >
                    {i}
                </button>
            );
        }

        if (endPage < totalPages) {
            pageNumbers.push(
                <button
                    key="next"
                    onClick={() => handlePageChange(endPage + 1)}
                    style={buttonStyle}
                >
                    <FaArrowRight/>
                </button>
            );
        }

        return pageNumbers;
    };

    const buttonStyle = {
        padding: "9px 14px",
        borderRadius: "100px",
        backgroundColor: "transparent",
        color: "#000",
        cursor: "pointer",
        border: "none",
        fontSize: "16px",
        fontWeight: "500",
    };

    return (
        <div className="notice-pageNation" style={{
            display: 'flex',
            justifyContent: 'center',
            margin: `${divMargin}`,
            alignItems: 'center',
        }}>
            {renderPageNumbers()}
        </div>
    );
};

export default PageNation;
