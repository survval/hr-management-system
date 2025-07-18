import React, { useState } from 'react';
import { X, Upload, Plus, Minus, Camera, FileText } from 'lucide-react';
import { Modal, Button, Card } from '@/components/ui';
import { EMPLOYEES, ASSET_CONDITIONS, DEPARTMENTS } from '@/utils/mockData';
import { useToast } from '@/hooks/useToast';

export interface AddAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
}


interface AssetFormData {
  assetName: string;
  category: string;
  serialNumber: string;
  model: string;
  manufacturer: string;
  assignTo: string;
  department: string;
  condition: string;
  purchaseDate: string;
  warrantyExpiry: string;
  cost: string;
  supplier: string;
  location: string;
  notes: string;
  tags: string[];
}

const ASSET_CATEGORIES = [
  'Laptop',
  'Desktop Computer',
  'Monitor',
  'Mobile Device',
  'Tablet',
  'Keyboard',
  'Mouse',
  'Headset',
  'Camera',
  'Printer',
  'Software License',
  'Furniture',
  'Other Equipment'
];

const LOCATIONS = [
  'Main Office - Floor 1',
  'Main Office - Floor 2',
  'Main Office - Floor 3',
  'Remote Work',
  'Warehouse',
  'Conference Room A',
  'Conference Room B',
  'IT Storage',
  'Reception',
  'Executive Office'
];

export const AddAssetModal: React.FC<AddAssetModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<AssetFormData>({
    assetName: '',
    category: '',
    serialNumber: '',
    model: '',
    manufacturer: '',
    assignTo: '',
    department: '',
    condition: 'excellent',
    purchaseDate: '',
    warrantyExpiry: '',
    cost: '',
    supplier: '',
    location: '',
    notes: '',
    tags: []
  });
  const [newTag, setNewTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate required fields
    if (!formData.assetName || !formData.category || !formData.condition) {
      showToast('Please fill in all required fields', 'error');
      setIsSubmitting(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      showToast(`Asset "${formData.assetName}" added successfully!`, 'success');
      handleClose();
      setIsSubmitting(false);
    }, 1500);
  };

  const handleClose = () => {
    setFormData({
      assetName: '',
      category: '',
      serialNumber: '',
      model: '',
      manufacturer: '',
      assignTo: '',
      department: '',
      condition: 'excellent',
      purchaseDate: '',
      warrantyExpiry: '',
      cost: '',
      supplier: '',
      location: '',
      notes: '',
      tags: []
    });
    setCurrentStep(1);
    setNewTag('');
    setIsSubmitting(false);
    setUploadedFiles([]);
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      return isValidType && isValidSize;
    });
    
    if (validFiles.length !== files.length) {
      showToast('Some files were rejected. Only images and PDFs under 5MB are allowed.', 'warning');
    }
    
    setUploadedFiles(prev => [...prev, ...validFiles].slice(0, 5)); // Max 5 files
  };

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.assetName && formData.category && formData.condition);
      case 2:
        return !!(formData.assignTo || formData.location);
      case 3:
        return true; // Optional fields
      default:
        return false;
    }
  };

  const StepIndicator: React.FC = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {[
        { step: 1, label: 'Basic Info' },
        { step: 2, label: 'Assignment' },
        { step: 3, label: 'Details' }
      ].map(({ step, label }) => (
        <div key={step} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                step === currentStep
                  ? 'bg-blue-600 text-white'
                  : step < currentStep
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {step < currentStep ? '✓' : step}
            </div>
            <span className="text-xs text-gray-500 mt-1">{label}</span>
          </div>
          {step < 3 && (
            <div
              className={`w-16 h-1 mx-4 mt-[-12px] transition-colors ${
                step < currentStep ? 'bg-green-500' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const Step1: React.FC = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Asset Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="assetName"
              value={formData.assetName}
              onChange={handleChange}
              placeholder="e.g., MacBook Pro 16-inch"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select category</option>
              {ASSET_CATEGORIES.map(category => (
                <option key={category} value={category.toLowerCase().replace(/\s+/g, '-')}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
            <input
              type="text"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={handleChange}
              placeholder="e.g., ABC123XYZ"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Condition <span className="text-red-500">*</span>
            </label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              {ASSET_CONDITIONS.map(condition => (
                <option key={condition} value={condition.toLowerCase()}>
                  {condition}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              placeholder="e.g., MacBook Pro M2"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer</label>
            <input
              type="text"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              placeholder="e.g., Apple, Dell, HP"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const Step2: React.FC = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Assignment & Location</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Assign To</label>
            <select
              name="assignTo"
              value={formData.assignTo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Not assigned</option>
              {EMPLOYEES.map(employee => (
                <option key={employee.id} value={employee.name}>
                  {employee.name} - {employee.department}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">Leave empty if not assigning to a specific person</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select department</option>
              {DEPARTMENTS.map(dept => (
                <option key={dept} value={dept.toLowerCase()}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select location</option>
              {LOCATIONS.map(location => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          
          {/* Assignment Status Card */}
          <div className="sm:col-span-2">
            <Card className="bg-blue-50 border-blue-200">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-blue-900">Assignment Options</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    You can assign this asset to a specific employee or just set a location. 
                    Assets can be reassigned later from the inventory table.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  const Step3: React.FC = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Date</label>
            <input
              type="date"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Warranty Expiry</label>
            <input
              type="date"
              name="warrantyExpiry"
              value={formData.warrantyExpiry}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cost</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
            <input
              type="text"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              placeholder="e.g., Best Buy, Amazon"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          {/* Tags Section */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
            <div className="flex space-x-2 mb-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag (e.g., urgent, expensive)"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button type="button" onClick={handleAddTag} size="sm" disabled={!newTag.trim()}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            {formData.tags.length === 0 && (
              <p className="text-xs text-gray-500 mt-1">Add tags to help categorize and find this asset later</p>
            )}
          </div>
          
          {/* File Upload Section */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Attachments</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-gray-400 transition-colors">
              <input
                type="file"
                multiple
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">
                  Click to upload photos or documents
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Images and PDFs up to 5MB each (max 5 files)
                </p>
              </label>
            </div>
            
            {/* Uploaded Files Display */}
            {uploadedFiles.length > 0 && (
              <div className="mt-3 space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded border">
                    <div className="flex items-center space-x-2">
                      {file.type.startsWith('image/') ? (
                        <Camera className="w-4 h-4 text-gray-500" />
                      ) : (
                        <FileText className="w-4 h-4 text-gray-500" />
                      )}
                      <span className="text-sm text-gray-700 truncate">{file.name}</span>
                      <span className="text-xs text-gray-500">
                        ({(file.size / 1024 / 1024).toFixed(1)} MB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Notes Section */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows={4}
              placeholder="Additional notes about the asset (e.g., special handling instructions, known issues, modifications)..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      default:
        return <Step1 />;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New Asset" size="xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <StepIndicator />
        
        {renderStepContent()}
        
        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-200">
          <div>
            {currentStep > 1 && (
              <Button
                type="button"
                variant="secondary"
                onClick={handlePreviousStep}
              >
                Previous
              </Button>
            )}
          </div>
          
          <div className="flex space-x-3">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            
            {currentStep < 3 ? (
              <Button
                type="button"
                onClick={handleNextStep}
                disabled={!isStepValid(currentStep)}
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting || !isStepValid(1)}
                className={isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Adding Asset...
                  </>
                ) : (
                  'Add Asset'
                )}
              </Button>
            )}
          </div>
        </div>
        
        {/* Form Summary */}
        {currentStep === 3 && formData.assetName && (
          <Card className="bg-gray-50 border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Asset Summary</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p><span className="font-medium">Name:</span> {formData.assetName}</p>
              <p><span className="font-medium">Category:</span> {formData.category}</p>
              {formData.assignTo && <p><span className="font-medium">Assigned to:</span> {formData.assignTo}</p>}
              {formData.location && <p><span className="font-medium">Location:</span> {formData.location}</p>}
              <p><span className="font-medium">Condition:</span> {formData.condition}</p>
            </div>
          </Card>
        )}
      </form>
    </Modal>
  );
};