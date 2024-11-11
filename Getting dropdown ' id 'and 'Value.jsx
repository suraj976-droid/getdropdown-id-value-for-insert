Purpose:  Getting dropdown ' id 'and 'Value which is being listed' => data-name={engineers.title}

1)this is form Code of Dropdown
"<div className="card mb-3" id="engineerInfocs"> 
            <div className="card-body">
              <h4 className="pname" style={{ fontSize: "14px" }}>
                Engineer
              </h4>
              <select
                className="form-select dropdown-select"
                name="engineer_id"
                value={complaintview.engineer_id} // Add this to control the value
                onChange={handleModelChange}
              >
                <option value="">Select Engineer</option>
                {Array.isArray(engineer) && engineer.length > 0 ? (
                  engineer.map((engineers) => (
                    <option
                      key={engineers.id}
                      data-name={engineers.title}
                      value={engineers.id}
                    >
                      {engineers.title}
                    </option>
                  ))
                ) : (
                  <option value="" disabled>
                    No engineers available
                  </option>
                )}
              </select>

              <div className="d-flex justify-content-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ fontSize: "14px" }}
                  onClick={handleSubmitTicketFormData}
                >
                  Submit
                </button>
              </div>
              {TicketUpdateSuccess.visible && (
                <div style={successMessageStyle}>
                  {TicketUpdateSuccess.message}
                </div>
              )}
            </div>
          </div>"

2) and this is onChange handle function
"  const handleModelChange = (e) => {
    const { name, value } = e.target;

    setComplaintview((prev) => ({ ...prev, [name]: value }));

    if (name == "engineer_id") {
      const selectedOption = e.target.options[e.target.selectedIndex];
      const assigned_to = selectedOption.getAttribute("data-name");
      setComplaintview((prev) => ({ ...prev, 'assigned_to': assigned_to }));
      console.log({ 'assigned_to': assigned_to });
    }
  };"

3) and this button onClick function 
"  const handleSubmitTicketFormData = (e) => {
    e.preventDefault();
    console.log({"Full complaintview state:": complaintview});
    console.log({ "engineer_name under function": complaintview.assigned_to });
    const data = {
      serial_no: complaintview.serial_no  || '',
      ModelNumber: complaintview.ModelNumber  || '',
      engineer_id: complaintview.engineer_id  || '',
      call_status: complaintview.call_status  || '',
      assigned_to: complaintview.assigned_to || '',
      updated_by: 1,
      ticket_no: complaintview.ticket_no  || '',
    };

    axios
      .post(`${Base_Url}/ticketFormData`, data)
      .then((response) => {
        console.log("Server response:", response.data);
        setComplaintview({
          ...complaintview,
          serial_no: "",
          ModelNumber: "",
          engineer_id: "",
          call_status: "",
          assigned_to: "",
        });
        fetchComplaintview(complaintid);

        setTicketUpdateSuccess({
          message: "Ticket updated successfully!",
          visible: true,
          type: "success",
        });

        // Hide the message after 3 seconds
        setTimeout(() => {
          setTicketUpdateSuccess({
            message: "",
            visible: false,
            type: "success",
          });
        }, 3000);
      })
      .catch((error) => {
        console.error("Error updating ticket:", error);
        setTicketUpdateSuccess({
          message: "Error updating ticket. Please try again.",
          visible: true,
          type: "error",
        });

        setTimeout(() => {
          setTicketUpdateSuccess({
            message: "",
            visible: false,
            type: "error",
          });
        }, 3000);
      });
  };"

4) and this is m Success message UseState
  const [TicketUpdateSuccess, setTicketUpdateSuccess] = useState({
    message: "",
    visible: false,
    type: "success", // can be 'success' or 'error'
  });

5) And This is SuccessFunction  const function code *Success Meassage *above the return placed - css style
"const successMessageStyle = {
    padding: "10px 15px",
    marginTop: "10px",
    borderRadius: "4px",
    fontSize: "14px",
    fontWeight: "500",
    textAlign: "center",
    opacity: TicketUpdateSuccess.visible ? "1" : "0",
    transition: "opacity 0.3s ease-in-out",
    backgroundColor:
      TicketUpdateSuccess.type === "success" ? "#d4edda" : "#f8d7da",
    color: TicketUpdateSuccess.type === "success" ? "#155724" : "#721c24",
    border:
      TicketUpdateSuccess.type === "success"
        ? "1px solid #c3e6cb"
        : "1px solid #f5c6cb",
  };

  return ("

6) setComplaintView UseState Code - Where input,dropdown,and all Field is being Set (api se Fetch and Set ka UseState Used for Both insert and Fetch and Update For setting state of variable Value)
 const [complaintview, setComplaintview] = useState({
    ticket_no: "",
    customer_name: "",
    address: "",
    pincode: "",
    customer_mobile: "",
    ticket_type: "",
    call_type: "",
    warranty_status: "",
    ModelNumber: "",
    invoice_date: "",
    serial_no: "",
    call_status: "",
    engineer_id: "",
    assigned_to: "",
  });

