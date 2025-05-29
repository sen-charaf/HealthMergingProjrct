"use client";

import { useState } from "react";
import { Calendar, Clock, Video, CreditCard, CheckCircle } from "lucide-react";
import { Doctor, Reason } from "../types";

interface StepFourProps {
  selectedDoctor: Doctor | null;
  selectedTimeSlot: string | null;
  selectedReasons: Reason[];
  doctor: any
}

export default function StepFour({
  selectedDoctor,
  selectedTimeSlot,
  selectedReasons,
  doctor
}: StepFourProps) {

  console.log("doctor: ", doctor);  

  const [paymentMethod, setPaymentMethod] = useState<
    "creditCard" | "insurance" | null
  >(null);

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const [insuranceDetails, setInsuranceDetails] = useState({
    provider: "",
    policyNumber: "",
    memberID: "",
  });

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardDetails({
      ...cardDetails,
      [name]: value,
    });
  };

  const handleInsuranceDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setInsuranceDetails({
      ...insuranceDetails,
      [name]: value,
    });
  };

  const isPaymentComplete = () => {
    if (paymentMethod === "creditCard") {
      return (
        cardDetails.cardNumber &&
        cardDetails.cardName &&
        cardDetails.expiry &&
        cardDetails.cvv
      );
    } else if (paymentMethod === "insurance") {
      return (
        insuranceDetails.provider &&
        insuranceDetails.policyNumber &&
        insuranceDetails.memberID
      );
    }
    return false;
  };

  // Calculate total fee dynamically
  const consultationFee = doctor?.consultationFee || 75;
  const serviceFee = 5;
  const totalFee = consultationFee + serviceFee;

  // Format selected time slot for display
  const formatTimeSlot = (timeSlot: string | null) => {
    if (!timeSlot) return "";
    // Assuming timeSlot format is "Monday-09:00" or similar
    const [day, time] = timeSlot.split('-');
    return `${day}, ${time}`;
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-medium text-gray-800 mb-2">
        Confirm Your Appointment
      </h2>
      <p className="text-gray-600 mb-6">
        Review your appointment details and complete payment
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Appointment Summary */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-[#1e3a8a] mb-4">
            Appointment Summary
          </h3>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                {doctor?.user?.profileImage ? (
                  <img
                    src={doctor.user.profileImage}
                    alt={`${doctor.user.firstName} ${doctor.user.lastName}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-600 text-lg font-medium">
                      {doctor?.user?.firstName?.[0]}{doctor?.user?.lastName?.[0]}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-medium text-gray-800">
                  Dr. {doctor?.user?.firstName} {doctor?.user?.lastName}
                </h4>
                <p className="text-gray-600 text-sm">
                  {doctor?.speciality}
                </p>
                {doctor?.isVerifiedDoctor && (
                  <div className="flex items-center gap-1 mt-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-xs text-green-600">Verified Doctor</span>
                  </div>
                )}
              </div>
            </div>

            {selectedTimeSlot && (
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#1e3a8a]" />
                <span className="text-gray-700">
                  {formatTimeSlot(selectedTimeSlot)}
                </span>
              </div>
            )}

            <div className="flex items-center gap-2">
              <Video className="h-5 w-5 text-[#1e3a8a]" />
              <span className="text-gray-700">Video Consultation</span>
            </div>

            {selectedReasons && selectedReasons.length > 0 && (
              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">
                  Reason for visit:
                </h5>
                <div className="flex flex-wrap gap-2">
                  {selectedReasons.map((reason) => (
                    <div
                      key={reason.id}
                      className="bg-[#eef2ff] text-[#1e3a8a] px-3 py-1 rounded-full text-sm"
                    >
                      {reason.title}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Doctor Additional Info */}
            <div className="pt-2">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                {doctor?.averageRating && (
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span>{doctor.averageRating}</span>
                    <span>({doctor.reviewsCount || 0} reviews)</span>
                  </div>
                )}
                {doctor?.languages && doctor.languages.length > 0 && (
                  <div>
                    <span className="font-medium">Languages: </span>
                    {doctor.languages.join(', ')}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Consultation Fee</span>
                <span className="font-medium text-gray-800">${consultationFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Service Fee</span>
                <span className="font-medium text-gray-800">${serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <span className="font-medium text-gray-800">Total</span>
                <span className="font-bold text-[#1e3a8a]">${totalFee.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Section */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-[#1e3a8a] mb-4">
            Payment Method
          </h3>

          <div className="space-y-6">
            {/* Payment Method Selection */}
            <div className="space-y-3">
              <button
                onClick={() => setPaymentMethod("creditCard")}
                className={`w-full flex items-center justify-between p-4 border rounded-lg ${paymentMethod === "creditCard"
                    ? "border-[#1e3a8a] bg-[#eef2ff] ring-2 ring-[#1e3a8a]"
                    : "border-gray-200 hover:border-[#1e3a8a]"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-[#1e3a8a]" />
                  <span className="font-medium text-gray-800">
                    Credit/Debit Card
                  </span>
                </div>
                {paymentMethod === "creditCard" && (
                  <CheckCircle className="h-5 w-5 text-[#1e3a8a]" />
                )}
              </button>

              <button
                onClick={() => setPaymentMethod("insurance")}
                className={`w-full flex items-center justify-between p-4 border rounded-lg ${paymentMethod === "insurance"
                    ? "border-[#1e3a8a] bg-[#eef2ff] ring-2 ring-[#1e3a8a]"
                    : "border-gray-200 hover:border-[#1e3a8a]"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 flex items-center justify-center text-[#1e3a8a]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 9h20M2 15h20M6 19V5M18 19V5"></path>
                    </svg>
                  </div>
                  <span className="font-medium text-gray-800">
                    Health Insurance
                  </span>
                </div>
                {paymentMethod === "insurance" && (
                  <CheckCircle className="h-5 w-5 text-[#1e3a8a]" />
                )}
              </button>
            </div>

            {/* Credit Card Form */}
            {paymentMethod === "creditCard" && (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="cardNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.cardNumber}
                    onChange={handleCardDetailsChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cardName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name on Card
                  </label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    placeholder="John Doe"
                    value={cardDetails.cardName}
                    onChange={handleCardDetailsChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="expiry"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiry"
                      name="expiry"
                      placeholder="MM/YY"
                      value={cardDetails.expiry}
                      onChange={handleCardDetailsChange}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="cvv"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      placeholder="123"
                      value={cardDetails.cvv}
                      onChange={handleCardDetailsChange}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Insurance Form */}
            {paymentMethod === "insurance" && (
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="provider"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Insurance Provider
                  </label>
                  <input
                    type="text"
                    id="provider"
                    name="provider"
                    placeholder="Blue Cross Blue Shield"
                    value={insuranceDetails.provider}
                    onChange={handleInsuranceDetailsChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="policyNumber"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Policy Number
                  </label>
                  <input
                    type="text"
                    id="policyNumber"
                    name="policyNumber"
                    placeholder="POL-12345678"
                    value={insuranceDetails.policyNumber}
                    onChange={handleInsuranceDetailsChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="memberID"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Member ID
                  </label>
                  <input
                    type="text"
                    id="memberID"
                    name="memberID"
                    placeholder="MEM-12345678"
                    value={insuranceDetails.memberID}
                    onChange={handleInsuranceDetailsChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                  />
                </div>
              </div>
            )}

            {/* Payment Status */}
            {paymentMethod && (
              <div
                className={`p-4 rounded-lg ${isPaymentComplete() ? "bg-[#e6f7f2]" : "bg-[#fff7ed]"
                  }`}
              >
                <div className="flex items-center gap-2">
                  {isPaymentComplete() ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-[#0d9488]" />
                      <span className="text-[#0d9488] font-medium">
                        Ready to confirm
                      </span>
                    </>
                  ) : (
                    <>
                      <Clock className="h-5 w-5 text-[#f59e0b]" />
                      <span className="text-[#f59e0b] font-medium">
                        Please complete payment details
                      </span>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-[#f8fafc] p-4 rounded-lg border border-gray-100">
        <p className="text-sm text-gray-600">
          By confirming this appointment, you agree to our{" "}
          <a href="#" className="text-[#1e3a8a] hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-[#1e3a8a] hover:underline">
            Privacy Policy
          </a>
          . You will receive a confirmation email with details about your video
          consultation.
        </p>
      </div>
    </div>
  );
}