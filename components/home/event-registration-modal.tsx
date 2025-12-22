"use client"

import { useState } from "react"
import { X, User, Users, GraduationCap, BookOpen, Phone, CreditCard, MapPin, Map, Calendar, IndianRupee } from "lucide-react"
import { Button } from "@/components/ui/button"

// Razorpay type declaration
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface Event {
  id: string
  title: string
  description: string
  date: string
  location: string
  amount: number
  total_seats: number
  available_seats: number
}

interface EventRegistrationModalProps {
  event: Event
  isOpen: boolean
  onClose: () => void
}

export function EventRegistrationModal({ event, isOpen, onClose }: EventRegistrationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    fatherName: "",
    schoolOrCollege: "",
    class: "",
    mobileNumber: "",
    aadhaarNumber: "",
    city: "",
    state: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // If event is free, skip payment
      if (event.amount === 0) {
        await handleFreeRegistration()
        return
      }

      // Check if Razorpay is loaded
      if (typeof window.Razorpay === 'undefined') {
        throw new Error("Razorpay SDK not loaded. Please refresh the page and try again.")
      }

      // Create Razorpay order
      // Generate a short receipt ID (max 40 chars)
      const shortReceipt = `evt_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 5)}`
      
      const orderResponse = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: event.amount,
          currency: "INR",
          receipt: shortReceipt,
          notes: {
            eventId: event.id,
            eventTitle: event.title,
            studentName: formData.name,
            mobile: formData.mobileNumber,
          },
        }),
      })

      if (!orderResponse.ok) {
        const errorData = await orderResponse.json()
        console.error("Order creation failed:", errorData)
        throw new Error(errorData.error || "Failed to create order")
      }

      const orderData = await orderResponse.json()
      console.log("Order created successfully:", orderData.orderId)

      // Get Razorpay key from environment
      const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
      if (!razorpayKey) {
        throw new Error("Razorpay configuration is missing. Please contact support.")
      }

      // Initialize Razorpay
      const options = {
        key: razorpayKey,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "C-LABS",
        description: event.title,
        order_id: orderData.orderId,
        prefill: {
          name: formData.name,
          contact: formData.mobileNumber,
          email: `${formData.mobileNumber}@registration.event`,
        },
        theme: {
          color: "#276EF1",
        },
        handler: async function (response: any) {
          await verifyPayment(response)
        },
        modal: {
          ondismiss: function () {
            console.log("Payment modal closed by user")
            setLoading(false)
          },
        },
      }

      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error: any) {
      console.error("Registration failed:", error)
      alert(error.message || "Failed to initiate payment. Please try again.")
      setLoading(false)
    }
  }

  const verifyPayment = async (paymentResponse: any) => {
    try {
      const verifyResponse = await fetch("/api/razorpay/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_order_id: paymentResponse.razorpay_order_id,
          razorpay_payment_id: paymentResponse.razorpay_payment_id,
          razorpay_signature: paymentResponse.razorpay_signature,
          formData: formData,
          eventDetails: event,
        }),
      })

      if (verifyResponse.ok) {
        setSuccess(true)
        setTimeout(() => {
          onClose()
          setSuccess(false)
          resetForm()
        }, 3000)
      } else {
        throw new Error("Payment verification failed")
      }
    } catch (error) {
      console.error("Payment verification failed:", error)
      alert("Payment verification failed. Please contact support with your payment details.")
    } finally {
      setLoading(false)
    }
  }

  const handleFreeRegistration = async () => {
    try {
      // Save registration to database first
      const registrationResponse = await fetch("/api/events/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: event.id,
          studentName: formData.name,
          fatherName: formData.fatherName,
          schoolCollege: formData.schoolOrCollege,
          class: formData.class,
          mobileNumber: formData.mobileNumber,
          aadhaarNumber: formData.aadhaarNumber,
          city: formData.city,
          state: formData.state,
          amountPaid: 0,
          paymentStatus: "completed",
        }),
      });

      if (!registrationResponse.ok) {
        const errorData = await registrationResponse.json();
        throw new Error(errorData.error || "Failed to save registration");
      }

      // Also save to contacts as backup
      const message = `Event Registration: ${event.title}\n\n` +
        `Name: ${formData.name}\n` +
        `Father's Name: ${formData.fatherName}\n` +
        `School/College: ${formData.schoolOrCollege}\n` +
        `Class: ${formData.class}\n` +
        `Mobile: ${formData.mobileNumber}\n` +
        `Aadhaar: ${formData.aadhaarNumber}\n` +
        `City: ${formData.city}\n` +
        `State: ${formData.state}\n` +
        `Amount: Free Event`

      await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: `${formData.mobileNumber}@registration.event`,
          phone: formData.mobileNumber,
          message: message,
        }),
      });

      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        resetForm();
        // Refresh the page to update seat count
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      console.error("Registration failed:", error);
      alert(error.message || "Failed to submit registration. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      fatherName: "",
      schoolOrCollege: "",
      class: "",
      mobileNumber: "",
      aadhaarNumber: "",
      city: "",
      state: "",
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full my-8">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#276EF1] to-[#37D2C5] text-white p-6 rounded-t-2xl">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">Event Registration</h2>
              <p className="text-white/90">{event.title}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Event Details */}
        <div className="p-6 bg-gray-50 border-b">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#276EF1]" />
              <span className="text-gray-600">
                {new Date(event.date).toLocaleDateString('en-US', {
                  weekday: 'short',
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-green-600" />
              <span className="font-semibold text-green-600">
                {event.amount === 0 ? 'Free Event' : `₹${event.amount.toFixed(2)}`}
              </span>
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-600" />
            <span className={`text-sm font-medium ${
              event.available_seats === 0 ? 'text-red-600' :
              event.available_seats < 10 ? 'text-orange-600' :
              'text-green-600'
            }`}>
              {event.available_seats === 0 
                ? 'Seats Full - Registration Closed' 
                : event.available_seats < 10 
                  ? `⚠️ Only ${event.available_seats} seats remaining!` 
                  : `${event.available_seats} of ${event.total_seats} seats available`
              }
            </span>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {success ? (
            <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8 text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-green-700 mb-2">Registration Successful!</h3>
              <p className="text-green-600">We'll contact you soon with event details.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Father's Name *
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.fatherName}
                      onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter father's name"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    School / College *
                  </label>
                  <div className="relative">
                    <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.schoolOrCollege}
                      onChange={(e) => setFormData({ ...formData, schoolOrCollege: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter school or college name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class *
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.class}
                      onChange={(e) => setFormData({ ...formData, class: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., 10th, B.Tech 2nd Year"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+91 98765 43210"
                      pattern="[0-9]{10}"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Aadhaar Number *
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.aadhaarNumber}
                      onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="XXXX XXXX XXXX"
                      pattern="[0-9]{12}"
                      maxLength={12}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your city"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <div className="relative">
                    <Map className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your state"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  onClick={onClose}
                  variant="outline"
                  className="flex-1"
                  disabled={loading}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-[#276EF1] to-[#37D2C5]"
                  disabled={loading}
                >
                  {loading 
                    ? "Processing..." 
                    : event.amount === 0 
                      ? "Complete Registration" 
                      : "Proceed to Payment"}
                </Button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  )
}
