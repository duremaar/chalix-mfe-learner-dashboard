import { useState, useEffect } from 'react';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { getConfig } from '@edx/frontend-platform';

/**
 * Hook to manage learning hours data
 */
export const useLearningHours = () => {
  const [learningHours, setLearningHours] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLearningHours = async () => {
    try {
      setLoading(true);
      const client = getAuthenticatedHttpClient();
      const baseUrl = getConfig().LMS_BASE_URL;

      const response = await client.get(`${baseUrl}/api/learning_analytics/learning-hours/`);
      setLearningHours(response.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch learning hours:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLearningHours();
  }, []);

  const refetch = () => {
    fetchLearningHours();
  };

  return {
    learningHours,
    loading,
    error,
    refetch,
  };
};

/**
 * Hook to manage learning hours approval requests
 */
export const useLearningHoursApproval = () => {
  const [approvals, setApprovals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchApprovals = async () => {
    try {
      setLoading(true);
      const client = getAuthenticatedHttpClient();
      const baseUrl = getConfig().LMS_BASE_URL;

      const response = await client.get(`${baseUrl}/api/learning_analytics/learning-hours-approval/`);
      setApprovals(response.data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch approvals:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const submitApprovalRequest = async (data) => {
    try {
      setLoading(true);
      const client = getAuthenticatedHttpClient();
      const baseUrl = getConfig().LMS_BASE_URL;

      const response = await client.post(
        `${baseUrl}/api/learning_analytics/learning-hours-approval/`,
        data,
      );

      // Refresh the approvals list
      await fetchApprovals();
      return response.data;
    } catch (err) {
      console.error('Failed to submit approval request:', err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovals();
  }, []);

  return {
    approvals,
    loading,
    error,
    fetchApprovals,
    submitApprovalRequest,
  };
};

export default {
  useLearningHours,
  useLearningHoursApproval,
};
