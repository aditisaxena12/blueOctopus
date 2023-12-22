const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

const keyVaultUrl = 'https://blueoctopuskv.vault.azure.net/';

async function getSecret(secretName) {
    // Create a SecretClient using Managed Identity
    const credential = new DefaultAzureCredential();
    console.log('Credential:', credential);
    const secretClient = new SecretClient(keyVaultUrl, credential);

    console.log('Azure Tenant ID:', process.env.AZURE_TENANT_ID);
    console.log('Azure Client ID:', process.env.AZURE_CLIENT_ID);
    console.log('Azure Client Secret:', process.env.AZURE_CLIENT_SECRET);
    console.log('Azure Subscription ID:', process.env.AZURE_SUBSCRIPTION_ID);


    // Retrieve the secret from Key Vault
    try {
        const secretBundle = await secretClient.getSecret(secretName);
        console.log('Secret:', secretBundle);
        return secretBundle.value;
    } catch (error) {
        console.error(`Error retrieving secret: ${error.message}`);
        throw error;
    }
}

module.exports = { getSecret };