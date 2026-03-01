'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheck, ChevronRight, ChevronLeft, CheckCircle, Globe, Building2, Mail, Phone, MessageSquare, MapPin, Zap } from 'lucide-react';

interface SetupData {
    businessName: string;
    websiteUrl: string;
    industry: string;
    channel: 'EMAIL' | 'FORM' | 'MAPS' | 'PHONE' | '';
    channelDetails: string;
    checkInterval: 'HOURLY' | 'EVERY_4_HOURS' | 'DAILY';
}

export default function OnboardingSetupPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [formData, setFormData] = useState<SetupData>({
        businessName: '',
        websiteUrl: '',
        industry: '',
        channel: '',
        channelDetails: '',
        checkInterval: 'EVERY_4_HOURS',
    });

    const totalSteps = 3;
    const progress = (step / totalSteps) * 100;

    const updateField = (field: keyof SetupData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateStep = (s: number): boolean => {
        const newErrors: Record<string, string> = {};

        if (s === 1) {
            if (!formData.businessName.trim()) newErrors.businessName = 'Business name is required';
            if (!formData.websiteUrl.trim()) {
                newErrors.websiteUrl = 'Website URL is required';
            } else {
                // Auto-prefix with https:// if no protocol
                let url = formData.websiteUrl.trim();
                if (!/^https?:\/\//i.test(url)) {
                    url = 'https://' + url;
                    setFormData(prev => ({ ...prev, websiteUrl: url }));
                }
                try {
                    new URL(url);
                } catch {
                    newErrors.websiteUrl = 'Please enter a valid URL (e.g., example.com)';
                }
            }
        }

        if (s === 2) {
            if (!formData.channel) newErrors.channel = 'Select how customers primarily contact you';
            if (formData.channel && !formData.channelDetails.trim()) {
                newErrors.channelDetails = 'Please provide channel details so we can monitor it';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(step)) setStep(step + 1);
    };

    const handleBack = () => setStep(step - 1);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setErrors({});

        try {
            const { completeOnboardingAction } = await import('@/app/actions');
            const result = await completeOnboardingAction({
                businessName: formData.businessName.trim(),
                websiteUrl: formData.websiteUrl.trim(),
                industry: formData.industry,
                channel: formData.channel,
                channelDetails: formData.channelDetails.trim(),
                checkInterval: formData.checkInterval,
            });

            if (result.success) {
                router.push('/app/dashboard');
                router.refresh();
            } else {
                setErrors({ submit: result.message || 'Failed to set up business' });
                setIsSubmitting(false);
            }
        } catch (e) {
            console.error(e);
            setErrors({ submit: 'An unexpected error occurred. Please try again.' });
            setIsSubmitting(false);
        }
    };

    const channelOptions = [
        { value: 'EMAIL', label: 'Email', icon: <Mail size={24} />, placeholder: 'contact@yourbusiness.com' },
        { value: 'FORM', label: 'Contact Form', icon: <MessageSquare size={24} />, placeholder: 'https://yourbusiness.com/contact' },
        { value: 'MAPS', label: 'Google Maps', icon: <MapPin size={24} />, placeholder: 'https://maps.google.com/...' },
        { value: 'PHONE', label: 'Phone', icon: <Phone size={24} />, placeholder: '+1 (555) 123-4567' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0B0E13] via-[#0d1117] to-[#0B0E13] flex items-center justify-center px-4 py-12">
            <div className="max-w-2xl w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 text-primary mb-4">
                        <ShieldCheck size={28} />
                        <span className="text-xl font-bold">Response Audit</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Set Up Your Business</h1>
                    <p className="text-gray-400 max-w-md mx-auto">
                        Tell us about your business so we can start monitoring your customer response channels and detecting revenue leaks.
                    </p>
                </div>

                {/* Progress */}
                <div className="mb-8">
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                        <span>Step {step} of {totalSteps}</span>
                        <span>{Math.round(progress)}% complete</span>
                    </div>
                    <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500 ease-out rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="flex justify-between mt-2">
                        {['Business Info', 'Contact Channel', 'Confirm & Launch'].map((label, i) => (
                            <span key={i} className={`text-xs ${i + 1 <= step ? 'text-emerald-400 font-medium' : 'text-gray-600'}`}>
                                {label}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-[#111]/70 border border-gray-800/60 rounded-xl backdrop-blur-sm overflow-hidden shadow-2xl">
                    <div className="p-8">
                        {/* Step 1: Business Details */}
                        {step === 1 && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-white mb-1 flex items-center gap-2">
                                        <Building2 size={20} className="text-emerald-400" />
                                        Your Business
                                    </h2>
                                    <p className="text-sm text-gray-400">We'll use this to identify and audit your online presence.</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Business Name <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.businessName}
                                        onChange={(e) => updateField('businessName', e.target.value)}
                                        className={`w-full bg-[#0A0A0A] border ${errors.businessName ? 'border-red-500' : 'border-gray-800'} rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors`}
                                        placeholder="Acme HVAC Services"
                                    />
                                    {errors.businessName && <p className="text-red-400 text-sm mt-1">{errors.businessName}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Website / Domain URL <span className="text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" size={18} />
                                        <input
                                            type="text"
                                            value={formData.websiteUrl}
                                            onChange={(e) => updateField('websiteUrl', e.target.value)}
                                            className={`w-full bg-[#0A0A0A] border ${errors.websiteUrl ? 'border-red-500' : 'border-gray-800'} rounded-lg pl-10 py-3 text-white placeholder:text-gray-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors`}
                                            placeholder="yourbusiness.com"
                                        />
                                    </div>
                                    {errors.websiteUrl && <p className="text-red-400 text-sm mt-1">{errors.websiteUrl}</p>}
                                    <p className="text-gray-600 text-xs mt-1">We'll automatically add https:// if needed</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Industry <span className="text-gray-600">(Optional)</span>
                                    </label>
                                    <select
                                        value={formData.industry}
                                        onChange={(e) => updateField('industry', e.target.value)}
                                        className="w-full bg-[#0A0A0A] border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                                    >
                                        <option value="">Select industry...</option>
                                        <option value="HVAC">HVAC</option>
                                        <option value="RESTAURANT">Restaurant</option>
                                        <option value="RETAIL">Retail</option>
                                        <option value="HEALTHCARE">Healthcare</option>
                                        <option value="AUTOMOTIVE">Automotive</option>
                                        <option value="REAL_ESTATE">Real Estate</option>
                                        <option value="LEGAL">Legal Services</option>
                                        <option value="FINANCE">Finance</option>
                                        <option value="ECOMMERCE">E-Commerce</option>
                                        <option value="AGENCY">Digital Agency</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Contact Channel */}
                        {step === 2 && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-white mb-1 flex items-center gap-2">
                                        <MessageSquare size={20} className="text-emerald-400" />
                                        Contact Channel
                                    </h2>
                                    <p className="text-sm text-gray-400">How do your customers primarily reach you? We'll monitor this channel for response gaps.</p>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    {channelOptions.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => updateField('channel', option.value)}
                                            className={`p-4 border-2 rounded-xl transition-all text-left ${formData.channel === option.value
                                                ? 'border-emerald-500 bg-emerald-500/10 shadow-lg shadow-emerald-500/10'
                                                : 'border-gray-800 hover:border-gray-600 bg-[#0A0A0A]'
                                                }`}
                                        >
                                            <div className={`mb-2 ${formData.channel === option.value ? 'text-emerald-400' : 'text-gray-500'}`}>
                                                {option.icon}
                                            </div>
                                            <div className="text-white font-medium text-sm">{option.label}</div>
                                        </button>
                                    ))}
                                </div>
                                {errors.channel && <p className="text-red-400 text-sm">{errors.channel}</p>}

                                {formData.channel && (
                                    <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            {formData.channel === 'EMAIL' && 'Email Address'}
                                            {formData.channel === 'FORM' && 'Contact Form URL'}
                                            {formData.channel === 'MAPS' && 'Google Maps Link'}
                                            {formData.channel === 'PHONE' && 'Phone Number'}
                                            <span className="text-red-400"> *</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.channelDetails}
                                            onChange={(e) => updateField('channelDetails', e.target.value)}
                                            className={`w-full bg-[#0A0A0A] border ${errors.channelDetails ? 'border-red-500' : 'border-gray-800'} rounded-lg px-4 py-3 text-white placeholder:text-gray-600 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors`}
                                            placeholder={channelOptions.find(o => o.value === formData.channel)?.placeholder}
                                        />
                                        {errors.channelDetails && <p className="text-red-400 text-sm mt-1">{errors.channelDetails}</p>}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Monitoring Frequency
                                    </label>
                                    <select
                                        value={formData.checkInterval}
                                        onChange={(e) => updateField('checkInterval', e.target.value)}
                                        className="w-full bg-[#0A0A0A] border border-gray-800 rounded-lg px-4 py-3 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                                    >
                                        <option value="HOURLY">Every hour (Maximum protection)</option>
                                        <option value="EVERY_4_HOURS">Every 4 hours (Recommended)</option>
                                        <option value="DAILY">Daily</option>
                                    </select>
                                    <p className="text-gray-600 text-xs mt-1">How often we'll check for response gaps</p>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Confirmation */}
                        {step === 3 && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-white mb-1 flex items-center gap-2">
                                        <CheckCircle size={20} className="text-emerald-400" />
                                        Review & Launch
                                    </h2>
                                    <p className="text-sm text-gray-400">Everything looks good? We'll start monitoring immediately.</p>
                                </div>

                                <div className="bg-[#0A0A0A] rounded-xl p-6 border border-gray-800 space-y-4">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-800">
                                        <span className="text-gray-400 text-sm">Business</span>
                                        <span className="text-white font-medium">{formData.businessName}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-800">
                                        <span className="text-gray-400 text-sm">Website</span>
                                        <span className="text-white font-medium text-sm">{formData.websiteUrl}</span>
                                    </div>
                                    {formData.industry && (
                                        <div className="flex justify-between items-center py-2 border-b border-gray-800">
                                            <span className="text-gray-400 text-sm">Industry</span>
                                            <span className="text-white font-medium">{formData.industry}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center py-2 border-b border-gray-800">
                                        <span className="text-gray-400 text-sm">Contact Channel</span>
                                        <span className="text-white font-medium">{formData.channel}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-800">
                                        <span className="text-gray-400 text-sm">Channel Details</span>
                                        <span className="text-white font-medium text-sm">{formData.channelDetails}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-gray-400 text-sm">Monitoring</span>
                                        <span className="text-white font-medium">
                                            {formData.checkInterval === 'HOURLY' ? 'Every hour' :
                                                formData.checkInterval === 'EVERY_4_HOURS' ? 'Every 4 hours' : 'Daily'}
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-start gap-3">
                                    <Zap size={20} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <p className="text-emerald-300 text-sm font-medium">Your first scan will run immediately</p>
                                        <p className="text-emerald-400/70 text-xs mt-1">
                                            We'll audit your website and contact channels, then display the full report on your dashboard.
                                        </p>
                                    </div>
                                </div>

                                {errors.submit && (
                                    <div className="bg-red-900/20 border border-red-900/40 rounded-lg p-3 text-sm text-red-300">
                                        {errors.submit}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Footer Actions */}
                    <div className="border-t border-gray-800/60 px-8 py-5 bg-[#0A0A0A]/50 flex justify-between items-center">
                        {step > 1 ? (
                            <button
                                onClick={handleBack}
                                className="px-5 py-2.5 text-gray-400 hover:text-white transition-colors flex items-center gap-2 rounded-lg hover:bg-gray-800"
                            >
                                <ChevronLeft size={18} />
                                Back
                            </button>
                        ) : (
                            <div />
                        )}

                        {step < totalSteps ? (
                            <button
                                onClick={handleNext}
                                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-black rounded-lg font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                            >
                                Next
                                <ChevronRight size={18} />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting}
                                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-black rounded-lg font-semibold transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Zap size={18} className="animate-spin" />
                                        Activating...
                                    </>
                                ) : (
                                    <>
                                        <Zap size={18} />
                                        Activate Monitoring
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
