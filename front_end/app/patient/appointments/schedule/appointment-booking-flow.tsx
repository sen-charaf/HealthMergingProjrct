"use client";

import type React from "react";

import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Check,
  CreditCard,
  User,
  Users,
} from "lucide-react";
import { format } from "date-fns";

type Doctor = {
  id: string;
  name: string;
  speciality: string;
  image: string;
  consultationFee: string;
};

type AppointmentBookingFlowProps = {
  doctor: Doctor;
  onBack: () => void;
};

type Beneficiary = "myself" | "child" | null;

type PaymentMethod = "credit-card" | "insurance" | "paypal" | null;

export default function AppointmentBookingFlow({
  doctor,
  onBack,
}: AppointmentBookingFlowProps) {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [beneficiary, setBeneficiary] = useState<Beneficiary>(null);
  const [childDetails, setChildDetails] = useState({
    name: "",
    age: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);
  const [cardDetails, setCardDetails] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
  });
  const [isBookingComplete, setIsBookingComplete] = useState(false);

  // Generate dates for the calendar (current month)
  const today = new Date();
  const daysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0
  ).getDate();
  const firstDayOfMonth = new Date(
    today.getFullYear(),
    today.getMonth(),
    1
  ).getDay();

  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  // Available time slots
  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
  ];

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleBeneficiarySelect = (type: Beneficiary) => {
    setBeneficiary(type);
  };

  const handleChildDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChildDetails({
      ...childDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setPaymentMethod(method);
  };

  const handleCardDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleBookAppointment = () => {
    // Here you would typically make an API call to book the appointment
    setIsBookingComplete(true);
  };

  const isDateSelectionValid = selectedDate !== null && selectedTime !== null;
  const isBeneficiarySelectionValid =
    beneficiary === "myself" ||
    (beneficiary === "child" && childDetails.name && childDetails.age);
  const isPaymentValid =
    paymentMethod === "credit-card"
      ? cardDetails.number &&
        cardDetails.name &&
        cardDetails.expiry &&
        cardDetails.cvc
      : paymentMethod !== null;

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-xl font-medium text-gray-800 mb-4">
              Select Appointment Time
            </h2>

            <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src={doctor.image || "/placeholder.svg?height=48&width=48"}
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{doctor.name}</h3>
                <p className="text-sm text-gray-600">{doctor.speciality}</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="grid grid-cols-7 gap-1 mb-2">
                {daysOfWeek.map((day, index) => (
                  <div
                    key={index}
                    className="text-center text-sm font-medium text-gray-600 py-1"
                  >
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-1">
                {Array(firstDayOfMonth)
                  .fill(null)
                  .map((_, index) => (
                    <div key={`empty-${index}`} className="h-10"></div>
                  ))}

                {calendarDays.map((day) => {
                  const date = new Date(
                    today.getFullYear(),
                    today.getMonth(),
                    day
                  );
                  const isSelected =
                    selectedDate &&
                    date.getDate() === selectedDate.getDate() &&
                    date.getMonth() === selectedDate.getMonth() &&
                    date.getFullYear() === selectedDate.getFullYear();
                  const isPast = date < new Date(today.setHours(0, 0, 0, 0));

                  return (
                    <button
                      key={day}
                      onClick={() => !isPast && handleDateSelect(date)}
                      disabled={isPast}
                      className={`h-10 flex items-center justify-center rounded-md transition-colors ${
                        isSelected
                          ? "bg-[#1e3a8a] text-white"
                          : isPast
                          ? "text-gray-300 cursor-not-allowed"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-base font-medium text-gray-800 mb-3">
                Available Times
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => handleTimeSelect(time)}
                    className={`py-2 px-4 border rounded-md text-center transition-colors ${
                      selectedTime === time
                        ? "border-[#1e3a8a] bg-[#eef2ff] text-[#1e3a8a]"
                        : "border-gray-200 hover:border-[#1e3a8a]"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div>
            <h2 className="text-xl font-medium text-gray-800 mb-4">
              Select Beneficiary
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => handleBeneficiarySelect("myself")}
                className={`p-6 border rounded-lg text-left transition-all ${
                  beneficiary === "myself"
                    ? "border-[#1e3a8a] bg-[#eef2ff] ring-2 ring-[#1e3a8a]"
                    : "border-gray-200 hover:border-[#1e3a8a]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2 text-[#1e3a8a]" />
                    <h3 className="font-medium">Myself</h3>
                  </div>
                  {beneficiary === "myself" && (
                    <div className="bg-[#1e3a8a] text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  Book appointment for yourself
                </p>
              </button>

              <button
                onClick={() => handleBeneficiarySelect("child")}
                className={`p-6 border rounded-lg text-left transition-all ${
                  beneficiary === "child"
                    ? "border-[#1e3a8a] bg-[#eef2ff] ring-2 ring-[#1e3a8a]"
                    : "border-gray-200 hover:border-[#1e3a8a]"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-[#1e3a8a]" />
                    <h3 className="font-medium">My Child</h3>
                  </div>
                  {beneficiary === "child" && (
                    <div className="bg-[#1e3a8a] text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  Book appointment for your child
                </p>
              </button>
            </div>

            {beneficiary === "child" && (
              <div className="border border-gray-200 rounded-lg p-4 mb-6">
                <h3 className="text-base font-medium text-gray-800 mb-3">
                  Child's Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="childName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Child's Full Name
                    </label>
                    <input
                      type="text"
                      id="childName"
                      name="name"
                      value={childDetails.name}
                      onChange={handleChildDetailsChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                      placeholder="Enter child's full name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="childAge"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Child's Age
                    </label>
                    <input
                      type="number"
                      id="childAge"
                      name="age"
                      value={childDetails.age}
                      onChange={handleChildDetailsChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                      placeholder="Enter child's age"
                      min="0"
                      max="17"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div>
            <h2 className="text-xl font-medium text-gray-800 mb-4">Payment</h2>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="text-base font-medium text-gray-800 mb-2">
                Appointment Summary
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Doctor:</span>
                  <span className="font-medium">{doctor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Speciality:</span>
                  <span>{doctor.speciality}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span>
                    {selectedDate ? format(selectedDate, "MMMM d, yyyy") : ""}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span>{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Patient:</span>
                  <span>
                    {beneficiary === "myself"
                      ? "Self"
                      : `Child - ${childDetails.name}`}
                  </span>
                </div>
                <div className="border-t border-gray-200 my-2 pt-2 flex justify-between font-medium">
                  <span>Total:</span>
                  <span>{doctor.consultationFee}</span>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-base font-medium text-gray-800 mb-3">
                Select Payment Method
              </h3>
              <div className="space-y-3">
                <button
                  onClick={() => handlePaymentMethodSelect("credit-card")}
                  className={`w-full p-4 border rounded-lg flex items-center justify-between transition-all ${
                    paymentMethod === "credit-card"
                      ? "border-[#1e3a8a] bg-[#eef2ff] ring-2 ring-[#1e3a8a]"
                      : "border-gray-200 hover:border-[#1e3a8a]"
                  }`}
                >
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 mr-2 text-[#1e3a8a]" />
                    <span>Credit or Debit Card</span>
                  </div>
                  {paymentMethod === "credit-card" && (
                    <div className="bg-[#1e3a8a] text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </button>

                <button
                  onClick={() => handlePaymentMethodSelect("insurance")}
                  className={`w-full p-4 border rounded-lg flex items-center justify-between transition-all ${
                    paymentMethod === "insurance"
                      ? "border-[#1e3a8a] bg-[#eef2ff] ring-2 ring-[#1e3a8a]"
                      : "border-gray-200 hover:border-[#1e3a8a]"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 mr-2 text-[#1e3a8a]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                    <span>Insurance</span>
                  </div>
                  {paymentMethod === "insurance" && (
                    <div className="bg-[#1e3a8a] text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </button>

                <button
                  onClick={() => handlePaymentMethodSelect("paypal")}
                  className={`w-full p-4 border rounded-lg flex items-center justify-between transition-all ${
                    paymentMethod === "paypal"
                      ? "border-[#1e3a8a] bg-[#eef2ff] ring-2 ring-[#1e3a8a]"
                      : "border-gray-200 hover:border-[#1e3a8a]"
                  }`}
                >
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 mr-2 text-[#1e3a8a]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.384a.64.64 0 0 1 .632-.537h6.012c2.658 0 4.53.625 5.568 1.855.936 1.109 1.344 2.57 1.224 4.336-.204 2.971-2.128 5.274-4.862 5.86a7.763 7.763 0 0 1-1.97.215H7.87l-.55 5.88a.642.642 0 0 1-.633.544h-.001l-.61-.001zM19.89 7.889c-.145 2.059-1.399 4.216-5.332 4.216h-3.15l-.84 9.118h-2.08L11.2 5.33h5.197c1.628 0 2.742.366 3.369 1.089.604.696.826 1.7.724 3.107l-.6.363z" />
                    </svg>
                    <span>PayPal</span>
                  </div>
                  {paymentMethod === "paypal" && (
                    <div className="bg-[#1e3a8a] text-white rounded-full p-1">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </button>
              </div>
            </div>

            {paymentMethod === "credit-card" && (
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-base font-medium text-gray-800 mb-3">
                  Card Details
                </h3>
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
                      name="number"
                      value={cardDetails.number}
                      onChange={handleCardDetailsChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cardName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      id="cardName"
                      name="name"
                      value={cardDetails.name}
                      onChange={handleCardDetailsChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="cardExpiry"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        id="cardExpiry"
                        name="expiry"
                        value={cardDetails.expiry}
                        onChange={handleCardDetailsChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cardCvc"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        CVC
                      </label>
                      <input
                        type="text"
                        id="cardCvc"
                        name="cvc"
                        value={cardDetails.cvc}
                        onChange={handleCardDetailsChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Appointment Confirmed!
            </h2>
            <p className="text-gray-600 mb-6">
              Your appointment has been successfully booked.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Appointment Details
              </h3>
              <div className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Doctor:</span>
                  <span className="font-medium">{doctor.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Speciality:</span>
                  <span>{doctor.speciality}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span>
                    {selectedDate ? format(selectedDate, "MMMM d, yyyy") : ""}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span>{selectedTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Patient:</span>
                  <span>
                    {beneficiary === "myself"
                      ? "Self"
                      : `Child - ${childDetails.name}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span>
                    {paymentMethod === "credit-card"
                      ? "Credit Card"
                      : paymentMethod === "insurance"
                      ? "Insurance"
                      : "PayPal"}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-2 border border-[#1e3a8a] text-[#1e3a8a] rounded-lg hover:bg-[#eef2ff] transition-colors flex items-center justify-center">
                <Calendar className="h-4 w-4 mr-2" />
                Add to Calendar
              </button>
              <button
                onClick={onBack}
                className="px-6 py-2 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#152a60] transition-colors"
              >
                Return to Home
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1e3a8a] mb-4">
            Book an Appointment
          </h1>

          {/* Progress Steps */}
          <div className="flex items-center justify-center">
            {[1, 2, 3, 4].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNumber
                      ? "bg-[#1e3a8a] text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 4 && (
                  <div
                    className={`w-12 h-1 ${
                      step > stepNumber ? "bg-[#1e3a8a]" : "bg-gray-200"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Back Button (except for confirmation screen) */}
        {step < 4 && (
          <button
            onClick={step === 1 ? onBack : handlePrevious}
            className="flex items-center text-[#1e3a8a] mb-6 hover:underline"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            {step === 1 ? "Back to Doctor Details" : "Back"}
          </button>
        )}

        {/* Step Content */}
        {renderStepContent()}

        {/* Navigation Buttons (except for confirmation screen) */}
        {step < 4 && (
          <div className="flex justify-between mt-8">
            {/* Remove this duplicate back button */}
            {/* <button
              onClick={step === 1 ? onBack : handlePrevious}
              className="px-6 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
            >
              Back
            </button> */}
            <div>{/* Empty div to maintain flex spacing */}</div>
            <button
              onClick={step === 3 ? handleBookAppointment : handleNext}
              disabled={
                (step === 1 && !isDateSelectionValid) ||
                (step === 2 && !isBeneficiarySelectionValid) ||
                (step === 3 && !isPaymentValid)
              }
              className={`px-6 py-2 rounded-lg transition-colors ${
                (step === 1 && isDateSelectionValid) ||
                (step === 2 && isBeneficiarySelectionValid) ||
                (step === 3 && isPaymentValid)
                  ? "bg-[#1e3a8a] text-white hover:bg-[#152a60]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {step === 3 ? "Complete Booking" : "Continue"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
