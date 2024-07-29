# Define variables
NAMESPACE="guestbook" # Change to your namespace
DEPLOY_NAME="guestbook-ui" # Change to your pod name
INTERVAL=1 # Interval in seconds

# Function to patch the pod
patch_pod() {
  TIMESTAMP=$(date +%s)
  kubectl patch deployment $DEPLOY_NAME -n $NAMESPACE --type='json' -p='[{"op": "replace", "path": "/spec/template/spec/containers/0/image", "value": "'gcr.io/heptio-images/ks-guestbook-demo:10'"}]'
  echo "Patched deploy $DEPLOY_NAME with timestamp $TIMESTAMP"
}

# Loop to patch the pod at the specified interval
while true; do
  patch_pod
  sleep 1
done
