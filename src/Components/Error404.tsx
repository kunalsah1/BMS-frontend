function ErrorPage() {
  return (
    <>
      <div className="dashboard-bg d-flex justify-content-center align-items-center">
        <div>
          <div className="b1000 green500">Oops !!. Something went wrong</div>

          <div
            className="button button-sm m600"
            onClick={() => (window.location.href = "/")}
          >
            Go to Login
          </div>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
