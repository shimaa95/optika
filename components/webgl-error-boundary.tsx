"use client"

import React, { Component, ErrorInfo, ReactNode } from "react"

interface Props {
  children?: ReactNode
  onError?: () => void
}

interface State {
  hasError: boolean
}

export class WebGLErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (this.props.onError) {
      this.props.onError()
    }
  }

  public render() {
    if (this.state.hasError) {
      return null
    }
    return this.props.children
  }
}
