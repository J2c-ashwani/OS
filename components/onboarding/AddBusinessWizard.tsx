'use client';

import { useState } from 'react';
import { X, ChevronRight, ChevronLeft, CheckCircle } from 'lucide-react';
import { updateOnboardingState } from '@/lib/onboarding/state';

interface AddBusinessWizardProps {
    onClose: () => void;
    onComplete?: (business: any) => void;
}

interface BusinessData {
    name: string;
    websiteUrl: string;
    industry: string;
    channel: 'EMAIL' | 'FORM' | 'MAPS' | 'PHONE' | '';
    channelDetails: string;
    checkInterval: 'HOURLY' | 'EVERY_4_HOURS' | 'DAILY';
    alertThreshold: number;
    emailNotifications: boolean;
}

export default function AddBusinessWizard({ onClose, onComplete }: AddBusinessWizardProps) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState<BusinessData>({
        name: '',
        websiteUrl: '',
        industry: '',
        channel: '',
        channelDetails: '',
        checkInterval: 'EVERY_4_HOURS',
        alertThreshold: 24,
        emailNotifications: true,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const updateField = (field: keyof BusinessData, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateStep = (currentStep: number): boolean => {
        const newErrors: Record<string, string> = {};

        if (currentStep === 1) {
            if (!formData.name.trim()) newErrors.name = 'Business name is required';
            if (!formData.websiteUrl.trim()) {
                newErrors.websiteUrl = 'Website URL is required';
            } else if (!/^https?:\/\/.+/.test(formData.websiteUrl)) {
                newErrors.websiteUrl = 'Please enter a valid URL (e.g., https://example.com)';
            }
        }

        if (currentStep === 2) {
            if (!formData.channel) newErrors.channel = 'Please select a contact channel';
            if (formData.channel && !formData.channelDetails.trim()) {
                newErrors.channelDetails = 'Please provide channel details';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep(step)) {
            setStep(step + 1);
        }
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    const handleSubmit = async () => {
        try {
            // Import dynamically or use the action passed as prop if strictly following client/server boundary
            // Since this is a client component, we can import the server action directly
            const { createBusinessAction } = await import('@/app/actions');

            const result = await createBusinessAction(formData);

            if (result.success) {
                // Update onboarding state
                updateOnboardingState({ firstBusinessAdded: true });

                // Callback
                onComplete?.(result.business);
                onClose();
            } else {
                setErrors({ submit: result.message || 'Failed to create business' });
            }
        } catch (e) {
            console.error(e);
            setErrors({ submit: 'An unexpected error occurred' });
        }
    };

    const progress = (step / 4) * 100;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative bg-slate-900 border border-slate-800 rounded-lg max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-slate-900 border-b border-slate-800 p-6 z-10">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-white">Add Business</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                        <span>Step {step} of 4</span>
                        <span>•</span>
                        <span>{Math.round(progress)}% complete</span>
                    </div>
                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-emerald-500 transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Step 1: Business Details */}
                    {step === 1 && (
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    Business Name <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => updateField('name', e.target.value)}
                                    className={`w-full bg-slate-800 border ${errors.name ? 'border-red-500' : 'border-slate-700'
                                        } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors`}
                                    placeholder="Acme HVAC Services"
                                />
                                {errors.name && (
                                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    Website URL <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="url"
                                    value={formData.websiteUrl}
                                    onChange={(e) => updateField('websiteUrl', e.target.value)}
                                    className={`w-full bg-slate-800 border ${errors.websiteUrl ? 'border-red-500' : 'border-slate-700'
                                        } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors`}
                                    placeholder="https://example.com"
                                />
                                {errors.websiteUrl && (
                                    <p className="text-red-400 text-sm mt-1">{errors.websiteUrl}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    Industry <span className="text-gray-500">(Optional)</span>
                                </label>
                                <select
                                    value={formData.industry}
                                    onChange={(e) => updateField('industry', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                >
                                    <option value="">Select industry...</option>
                                    <option value="HVAC">HVAC</option>
                                    <option value="RESTAURANT">Restaurant</option>
                                    <option value="RETAIL">Retail</option>
                                    <option value="HEALTHCARE">Healthcare</option>
                                    <option value="AUTOMOTIVE">Automotive</option>
                                    <option value="OTHER">Other</option>
                                </select>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Contact Channel */}
                    {step === 2 && (
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-white mb-3">
                                    Primary Contact Channel <span className="text-red-400">*</span>
                                </label>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { value: 'EMAIL', label: 'Email', icon: '📧' },
                                        { value: 'FORM', label: 'Contact Form', icon: '📝' },
                                        { value: 'MAPS', label: 'Google Maps', icon: '🗺️' },
                                        { value: 'PHONE', label: 'Phone', icon: '📞' },
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => updateField('channel', option.value)}
                                            className={`p-4 border-2 rounded-lg transition-all ${formData.channel === option.value
                                                ? 'border-emerald-500 bg-emerald-500/10'
                                                : 'border-slate-700 hover:border-slate-600'
                                                }`}
                                        >
                                            <div className="text-2xl mb-1">{option.icon}</div>
                                            <div className="text-white font-medium text-sm">{option.label}</div>
                                        </button>
                                    ))}
                                </div>
                                {errors.channel && (
                                    <p className="text-red-400 text-sm mt-2">{errors.channel}</p>
                                )}
                            </div>

                            {formData.channel && (
                                <div>
                                    <label className="block text-sm font-medium text-white mb-2">
                                        {formData.channel === 'EMAIL' && 'Email Address'}
                                        {formData.channel === 'FORM' && 'Form URL'}
                                        {formData.channel === 'MAPS' && 'Google Maps URL'}
                                        {formData.channel === 'PHONE' && 'Phone Number'}
                                        <span className="text-red-400"> *</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.channelDetails}
                                        onChange={(e) => updateField('channelDetails', e.target.value)}
                                        className={`w-full bg-slate-800 border ${errors.channelDetails ? 'border-red-500' : 'border-slate-700'
                                            } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors`}
                                        placeholder={
                                            formData.channel === 'EMAIL' ? 'contact@example.com' :
                                                formData.channel === 'PHONE' ? '+1 (555) 123-4567' :
                                                    'https://...'
                                        }
                                    />
                                    {errors.channelDetails && (
                                        <p className="text-red-400 text-sm mt-1">{errors.channelDetails}</p>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 3: Monitoring Settings */}
                    {step === 3 && (
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    Check Interval
                                </label>
                                <select
                                    value={formData.checkInterval}
                                    onChange={(e) => updateField('checkInterval', e.target.value)}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                >
                                    <option value="HOURLY">Every hour</option>
                                    <option value="EVERY_4_HOURS">Every 4 hours (Recommended)</option>
                                    <option value="DAILY">Daily</option>
                                </select>
                                <p className="text-gray-400 text-xs mt-1">How often we'll check for response gaps</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white mb-2">
                                    Alert Threshold: {formData.alertThreshold} hours
                                </label>
                                <input
                                    type="range"
                                    min="12"
                                    max="72"
                                    step="6"
                                    value={formData.alertThreshold}
                                    onChange={(e) => updateField('alertThreshold', parseInt(e.target.value))}
                                    className="w-full"
                                />
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>12h</span>
                                    <span>72h</span>
                                </div>
                                <p className="text-gray-400 text-xs mt-1">Alert me if no response after this many hours</p>
                            </div>

                            <div>
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.emailNotifications}
                                        onChange={(e) => updateField('emailNotifications', e.target.checked)}
                                        className="w-5 h-5 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900"
                                    />
                                    <span className="text-white">Enable email notifications</span>
                                </label>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Confirmation */}
                    {step === 4 && (
                        <div className="space-y-6">
                            <div className="bg-slate-800/50 rounded-lg p-6 border border-slate-700">
                                <div className="flex items-center gap-3 mb-6">
                                    <CheckCircle size={28} className="text-emerald-500" />
                                    <h3 className="text-xl font-semibold text-white">Review & Confirm</h3>
                                </div>

                                <div className="space-y-4 text-sm">
                                    <div>
                                        <div className="text-gray-400">Business Name</div>
                                        <div className="text-white font-medium">{formData.name}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-400">Website</div>
                                        <div className="text-white font-medium">{formData.websiteUrl}</div>
                                    </div>
                                    {formData.industry && (
                                        <div>
                                            <div className="text-gray-400">Industry</div>
                                            <div className="text-white font-medium">{formData.industry}</div>
                                        </div>
                                    )}
                                    <div>
                                        <div className="text-gray-400">Contact Channel</div>
                                        <div className="text-white font-medium">{formData.channel} - {formData.channelDetails}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-400">Monitoring</div>
                                        <div className="text-white font-medium">
                                            {formData.checkInterval.replace('_', ' ')} • Alert after {formData.alertThreshold}h
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-gray-400">Notifications</div>
                                        <div className="text-white font-medium">
                                            {formData.emailNotifications ? 'Enabled' : 'Disabled'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-4">
                                <p className="text-blue-300 text-sm">
                                    🚀 Your first health check will run automatically within the next hour!
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="sticky bottom-0 bg-slate-900 border-t border-slate-800 p-6">
                    <div className="flex justify-between gap-3">
                        {step > 1 ? (
                            <button
                                onClick={handleBack}
                                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                            >
                                <ChevronLeft size={18} />
                                Back
                            </button>
                        ) : (
                            <button
                                onClick={onClose}
                                className="px-6 py-3 text-gray-400 hover:text-white transition-colors"
                            >
                                Cancel
                            </button>
                        )}

                        {step < 4 ? (
                            <button
                                onClick={handleNext}
                                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-black rounded-lg font-semibold transition-colors flex items-center gap-2"
                            >
                                Next
                                <ChevronRight size={18} />
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-black rounded-lg font-semibold transition-colors"
                            >
                                Activate Monitoring
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
