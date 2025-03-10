
import { API_BASE_URL } from './apiConfig';

export interface Organization {
  id?: string;
  name: string;
  type: string;
  address: string;
  contactPerson: string;
  contactNumber: string;
  status: "active" | "inactive";
}

// Get all organizations
export const getOrganizations = async (): Promise<Organization[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/organizations`);
    if (!response.ok) {
      throw new Error('Failed to fetch organizations');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching organizations:', error);
    // Return mock data for development when API fails
    return [
      {
        id: "1",
        name: "Red Cross Society",
        type: "Blood Bank",
        address: "123 Main St, New York, NY",
        contactPerson: "John Walker",
        contactNumber: "+1 (555) 123-4567",
        status: "active",
      },
      {
        id: "2",
        name: "City Hospital",
        type: "Hospital",
        address: "456 Park Ave, Boston, MA",
        contactPerson: "Jane Anderson",
        contactNumber: "+1 (555) 987-6543",
        status: "active",
      },
      {
        id: "3",
        name: "Community Health Center",
        type: "Health Center",
        address: "789 Oak Dr, Chicago, IL",
        contactPerson: "Robert Brown",
        contactNumber: "+1 (555) 456-7890",
        status: "inactive",
      },
    ];
  }
};

// Get organization by ID
export const getOrganizationById = async (id: string): Promise<Organization> => {
  try {
    const response = await fetch(`${API_BASE_URL}/organizations/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch organization');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching organization:', error);
    throw error;
  }
};

// Create new organization
export const createOrganization = async (data: Organization): Promise<Organization> => {
  try {
    const response = await fetch(`${API_BASE_URL}/organizations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to create organization');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating organization:', error);
    // For development, simulate a successful creation
    return {
      ...data,
      id: `new-${Date.now()}`,
    };
  }
};

// Update organization
export const updateOrganization = async (id: string, data: Organization): Promise<Organization> => {
  try {
    const response = await fetch(`${API_BASE_URL}/organizations/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to update organization');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating organization:', error);
    // For development, simulate a successful update
    return {
      ...data,
      id,
    };
  }
};

// Delete organization
export const deleteOrganization = async (id: string): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/organizations/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete organization');
    }
    return true;
  } catch (error) {
    console.error('Error deleting organization:', error);
    // For development, assume success
    return true;
  }
};
