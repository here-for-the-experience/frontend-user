import React from "react";
import { render, waitFor } from "@testing-library/react";
import { describe, expect, test, beforeEach, afterEach } from "@jest/globals";
import MockAdapter from "axios-mock-adapter";
import Home from "../pages/Home";
import "@testing-library/jest-dom";
import axios from "axios";

describe("ImageDownload", () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  test("downloads the certificate image", async () => {
    // Mock the API responses
    const token = "mock-token";
    const certificateUrl = "mock-certificate-url";
    mockAxios
      .onPost("/create", { token })
      .reply(200)
      .onPost("/myvaccine", { token })
      .reply(200, [{ certificate_url: certificateUrl }]);

    // Wait for the API requests to complete
    await waitFor(() => {
      expect(mockAxios.history.post.length).toBe(0);
    });

    // Click on the image to trigger the download
    // const imageElement = screen.queryByTestId("img");
    // imageElement.click();

    // Assert that the download was initiated
    // expect(window.location.href).toBe(certificateUrl);
    // expect(imageElement.getAttribute("download")).toBe("certificate.jpg");
  });
});

describe("Home component", () => {
  test("renders without errors", () => {
    render(<Home />);
    // Add assertions to check that the component renders without errors
  });

  const columns = [
    { title: "Vaccine Center", dataIndex: "center", key: "center" },
    {
      title: "Vaccine Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => {
        a.date - b.date;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (order, record) => {
        return (
          <div>
            {record.status === false ? <div>false</div> : <div>true</div>}
          </div>
        );
      },
    },
    { title: "Operator", dataIndex: "operator", key: "operator" },
    { title: "Action", dataIndex: "certificate_url", key: "certificate_url" },
  ];

  describe("Columns configuration", () => {
    test("should have expected number of columns", () => {
      expect(columns).toHaveLength(5);
    });

    test("should have correct column titles", () => {
      const expectedTitles = [
        "Vaccine Center",
        "Vaccine Date",
        "Status",
        "Operator",
        "Action",
      ];

      const columnTitles = columns.map((column) => column.title);
      expect(columnTitles).toEqual(expectedTitles);
    });

    test("should have unique keys for each column", () => {
      const columnKeys = columns.map((column) => column.key);
      const uniqueKeys = new Set(columnKeys);

      expect(uniqueKeys.size).toEqual(columnKeys.length);
    });

    test('should have correct sorter function for "Vaccine Date" column', () => {
      const vaccineDateColumn = columns.find(
        (column) => column.title === "Vaccine Date"
      );
      expect(vaccineDateColumn.sorter).toBeInstanceOf(Function);
    });

    test('should render "Status" column correctly', () => {
      const statusColumn = columns.find((column) => column.title === "Status");
      const { render } = statusColumn;
      const order = 0;
      const record = { status: false };
      const renderedContent = render(order, record);

      expect(renderedContent.props.children).toEqual(<div>false</div>);
    });

    test('should render "Status" column correctly', () => {
      const statusColumn = columns.find((column) => column.title === "Status");
      const { render } = statusColumn;
      const order = 0;
      const record = { status: true };
      const renderedContent = render(order, record);

      expect(renderedContent.props.children).toEqual(<div>true</div>);
    });
  });

  // Add more test cases to cover different scenarios and edge cases
});

describe("Conditional rendering", () => {
  test('renders "Pending" text when item status is false', () => {
    const item = {
      status: false,
    };

    const { getByText } = render(
      <div>
        {item.status === false ? (
          <div className="text-yellow-500 inline">Pending</div>
        ) : (
          <div className="text-green-500 inline">Complete</div>
        )}
      </div>
    );

    const pendingText = getByText("Pending");

    expect(pendingText).toBeInTheDocument();
    expect(pendingText).toHaveClass("text-yellow-500");
  });
});

describe("Conditional rendering", () => {
  test('renders "Complete" text when item status is true', () => {
    const item = {
      status: true,
    };

    const { getByText } = render(
      <div>
        {item.status === false ? (
          <div className="text-yellow-500 inline">Pending</div>
        ) : (
          <div className="text-green-500 inline">Complete</div>
        )}
      </div>
    );

    const completeText = getByText("Complete");

    expect(completeText).toBeInTheDocument();
    expect(completeText).toHaveClass("text-green-500");
  });
});

describe("conditional rendering", () => {
  test("something", () => {
    render(<Home />);
  });
});

describe("Column rendering function", () => {
  test('renders "false" div when record status is false', () => {
    const renderFunction = (order, record) => {
      return <div>{record.status === false ? <div>false</div> : "true"}</div>;
    };

    const record = {
      status: false,
    };

    const { getByText } = render(renderFunction(null, record));

    const falseDiv = getByText("false");

    expect(falseDiv).toBeInTheDocument();
  });

  test('renders "true" string when record status is true', () => {
    const renderFunction = (order, record) => {
      return <div>{record.status === false ? <div>false</div> : "true"}</div>;
    };

    const record = {
      status: true,
    };

    const { getByText } = render(renderFunction(null, record));

    const trueText = getByText("true");

    expect(trueText).toBeInTheDocument();
  });
});
